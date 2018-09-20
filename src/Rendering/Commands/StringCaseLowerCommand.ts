import { NativeCallSyntax } from "../Languages/Properties/Syntax/NativeCallSyntax";
import { CommandNames } from "../Names/CommandNames";
import { CommandMetadata } from "./Metadata/CommandMetadata";
import { SingleParameter } from "./Metadata/Parameters/SingleParameter";
import { NativeCallCommand } from "./NativeCallCommand";

/**
 * Creates a lower-case version of a string.
 */
export class StringCaseLowerCommand extends NativeCallCommand {
    /**
     * Metadata on the command.
     */
    private static metadata: CommandMetadata = new CommandMetadata(CommandNames.StringCaseLower)
        .withDescription("Creates a lower-case version of a string")
        .withParameters([new SingleParameter("string", "A string to create a lower-case version of.", true)]);

    /**
     * @returns Metadata on the command.
     */
    public getMetadata(): CommandMetadata {
        return StringCaseLowerCommand.metadata;
    }

    /**
     * @returns Metadata on how to perform the native call.
     */
    protected retrieveNativeCallSyntax(): NativeCallSyntax {
        return this.language.syntax.strings.caseLower;
    }
}
