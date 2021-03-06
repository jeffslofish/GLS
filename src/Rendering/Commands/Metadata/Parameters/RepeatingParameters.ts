import { CommandNode } from "../../../../Tokenization/Nodes/CommandNode";
import { IGlsNode } from "../../../../Tokenization/Nodes/IGlsNode";
import { TextNode } from "../../../../Tokenization/Nodes/TextNode";
import { KeywordParameter } from "./KeywordParameter";
import { IParameter } from "./Parameter";

/**
 * Some number of repeating parameters.
 */
export class RepeatingParameters implements IParameter {
    /**
     * A plain-text description of this parameter.
     */
    public description: string;

    /**
     * Parameters contained inside.
     */
    public parameters: IParameter[];

    /**
     * Initializes a new instance of the RepeatingParameter class.
     *
     * @param descriptor   A plain-text description of the parameter.
     * @param parameters   Parameters contained inside.
     */
    public constructor(description: string, parameters: IParameter[]) {
        this.description = description;
        this.parameters = parameters;
    }

    /**
     * @returns Whether this parameter is required (false).
     */
    public isRequired(): boolean {
        return false;
    }

    /**
     * Validates whether a command's args match this requirement.
     *
     * @param node   Command node with args from a source file.
     * @param inputPosition   Index of a starting input under test.
     * @param requirements   All parameter requirements.
     * @param requirementPosition   Index of the parameter requirement under test.
     * @returns A new input position following all valid inputs.
     */
    public validate(node: CommandNode, inputPosition: number, requirements: IParameter[], requirementPosition: number): number {
        const endIndex = this.getEndingIndex(node, inputPosition, requirements, requirementPosition);
        const repeatedCount = endIndex - inputPosition;

        if (repeatedCount % this.parameters.length !== 0) {
            throw new Error(
                `${node.command}: Expected a multiple of ${this.parameters.length} repeating parameters but got ${repeatedCount}.`,
            );
        }

        return endIndex;
    }

    /**
     * Finds an index of a matched keyword parameter following a repeating parameter.
     *
     * @param node   Command node with args from a source file.
     * @param inputPosition   Index of a starting input under test.
     * @param requirements   All parameter requirements.
     * @param requirementPosition   Index of the parameter requirement under test.
     * @returns Index of a matched keyword parameter, or -1 if no match is found.
     */
    private doesNextCommandMatchKeywordParameter(
        node: CommandNode,
        inputPosition: number,
        requirements: IParameter[],
        requirementPosition: number,
    ): number {
        const nextRequirement = requirements[requirementPosition + 1];

        if (nextRequirement instanceof KeywordParameter) {
            for (let i = inputPosition; i < node.args.length; i += 1) {
                const arg = node.args[i];

                if (arg instanceof TextNode && nextRequirement.literals.has(arg.text)) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * Computes when repeating parameter inputs end.
     *
     * @param node   Command node with args from a source file.
     * @param inputPosition   Index of a starting input under test.
     * @param requirements   All parameter requirements.
     * @param requirementPosition   Index of the parameter requirement under test.
     * @returns A new input position following all valid inputs.
     */
    private getEndingIndex(node: CommandNode, inputPosition: number, requirements: IParameter[], requirementPosition: number): number {
        // If the last requirement is a repeating parameter, all subsequent inputs are acceptable
        if (requirementPosition === requirements.length - 1) {
            return node.args.length;
        }

        // Termination case: if the next command is a KeywordParameter
        const keywordMatchIndex = this.doesNextCommandMatchKeywordParameter(node, inputPosition, requirements, requirementPosition);
        if (keywordMatchIndex !== -1) {
            return keywordMatchIndex;
        }

        // Termination case: there are too many remaining required parameters
        return node.args.length - this.getRemainingRequiredParameters(requirements, requirementPosition);
    }

    /**
     * Computes how many required parameters are left.
     *
     * @param requirements   All parameter requirements.
     * @param requirementPosition   Index of the parameter requirement under test.
     * @returns How many required parameters are left.
     */
    private getRemainingRequiredParameters(requirements: IParameter[], requirementPosition: number): number {
        let remainingRequiredParameters = 0;

        for (let i = requirementPosition; i < requirements.length; i += 1) {
            const requirement = requirements[i];

            if (requirement.isRequired()) {
                remainingRequiredParameters += 1;
            }
        }

        return remainingRequiredParameters;
    }
}
