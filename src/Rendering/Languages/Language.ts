import { GeneralProperties } from "./Properties/GeneralProperties";
import { ProjectProperties } from "./Properties/ProjectProperties";
import { ArraySyntax } from "./Properties/Syntax/ArraySyntax";
import { BooleanSyntax } from "./Properties/Syntax/BooleanSyntax";
import { ClassExportSyntax } from "./Properties/Syntax/ClassExportSyntax";
import { ClassGenericSyntax } from "./Properties/Syntax/ClassGenericSyntax";
import { ClassMemberFunctionSyntax } from "./Properties/Syntax/ClassMemberFunctionSyntax";
import { ClassMemberVariableSyntax } from "./Properties/Syntax/ClassMemberVariableSyntax";
import { ClassStaticFunctionSyntax } from "./Properties/Syntax/ClassStaticFunctionSyntax";
import { ClassStaticVariableSyntax } from "./Properties/Syntax/ClassStaticVariableSyntax";
import { ClassSyntax } from "./Properties/Syntax/ClassSyntax";
import { CommentSyntax } from "./Properties/Syntax/CommentSyntax";
import { ConditionalSyntax } from "./Properties/Syntax/ConditionalSyntax";
import { DictionarySyntax } from "./Properties/Syntax/DictionarySyntax";
import { EnumSyntax } from "./Properties/Syntax/EnumSyntax";
import { ExceptionSyntax } from "./Properties/Syntax/ExceptionSyntax";
import { FileSyntax } from "./Properties/Syntax/FileSyntax";
import { FunctionSyntax } from "./Properties/Syntax/FunctionSyntax";
import { ImportSyntax } from "./Properties/Syntax/ImportSyntax";
import { InterfaceSyntax } from "./Properties/Syntax/InterfaceSyntax";
import { LambdaSyntax } from "./Properties/Syntax/LambdaSyntax";
import { ListSyntax } from "./Properties/Syntax/ListSyntax";
import { LoopSyntax } from "./Properties/Syntax/LoopSyntax";
import { MainSyntax } from "./Properties/Syntax/MainSyntax";
import { MathSyntax } from "./Properties/Syntax/MathSyntax";
import { NewSyntax } from "./Properties/Syntax/NewSyntax";
import { OperatorSyntax } from "./Properties/Syntax/OperatorSyntax";
import { ParameterSyntax } from "./Properties/Syntax/ParameterSyntax";
import { PrintingSyntax } from "./Properties/Syntax/PrintingSyntax";
import { SetSyntax } from "./Properties/Syntax/SetSyntax";
import { StandaloneFunctionSyntax } from "./Properties/Syntax/StandaloneFunctionSyntax";
import { StringFormatSyntax } from "./Properties/Syntax/StringFormatSyntax";
import { StringSubstringSyntax } from "./Properties/Syntax/StringSubstringSyntax";
import { StringSyntax } from "./Properties/Syntax/StringSyntax";
import { StringToFloatSyntax } from "./Properties/Syntax/StringToFloatSyntax";
import { StyleSyntax } from "./Properties/Syntax/StyleSyntax";
import { UnsupportedSyntax } from "./Properties/Syntax/UnsupportedSyntax";
import { VariableSyntax } from "./Properties/Syntax/VariableSyntax";
import { SyntaxProperties } from "./Properties/SyntaxProperties";

/**
 * A summary of information for a single language.
 */
export abstract class Language {
    /**
     * Metadata on the language's general properties.
     */
    public general: GeneralProperties;

    /**
     * Metadata on a language's project schemas.
     */
    public projects: ProjectProperties;

    /**
     * Metadata about the language's syntax.
     */
    public syntax: SyntaxProperties;

    /**
     * Initializes a new instance of the Language class.
     */
    public constructor() {
        this.general = new GeneralProperties();
        this.generateGeneralProperties(this.general);

        this.projects = new ProjectProperties();
        this.generateProjectProperties(this.projects);

        this.syntax = new SyntaxProperties();
        this.generateArraySyntax(this.syntax.arrays);
        this.generateBooleanSyntax(this.syntax.booleans);
        this.generateClassSyntax(this.syntax.classes);
        this.generateClassExportSyntax(this.syntax.classes.exports);
        this.generateClassGenericSyntax(this.syntax.classes.generics);
        this.generateClassMemberFunctionSyntax(this.syntax.classes.members.functions);
        this.generateClassMemberVariableSyntax(this.syntax.classes.members.variables);
        this.generateClassStaticFunctionSyntax(this.syntax.classes.statics.functions);
        this.generateClassStaticVariableSyntax(this.syntax.classes.statics.variables);
        this.generateCommentSyntax(this.syntax.comments);
        this.generateConditionalSyntax(this.syntax.conditionals);
        this.generateDictionarySyntax(this.syntax.dictionaries);
        this.generateEnumSyntax(this.syntax.enums);
        this.generateExceptionSyntax(this.syntax.exceptions);
        this.generateFileSyntax(this.syntax.files);
        this.generateFunctionSyntax(this.syntax.functions);
        this.generateImportSyntax(this.syntax.imports);
        this.generateInterfaceSyntax(this.syntax.interfaces);
        this.generateLambdaSyntax(this.syntax.lambdas);
        this.generateListSyntax(this.syntax.lists);
        this.generateLoopSyntax(this.syntax.loops);
        this.generateMainSyntax(this.syntax.main);
        this.generateMathSyntax(this.syntax.math);
        this.generateNewSyntax(this.syntax.newProp);
        this.generateOperatorSyntax(this.syntax.operators);
        this.generateParameterSyntax(this.syntax.parameters);
        this.generatePrintingSyntax(this.syntax.printing);
        this.generateSetSyntax(this.syntax.sets);
        this.generateStandaloneFunctionSyntax(this.syntax.standaloneFunctions);
        this.generateStringFormatSyntax(this.syntax.strings.formatting);
        this.generateStringSyntax(this.syntax.strings);
        this.generateStringSubstringSyntax(this.syntax.strings.substrings);
        this.generateStringToFloatSyntax(this.syntax.strings.toFloat);
        this.generateStyleSyntax(this.syntax.style);
        this.generateUnsupportedSyntax(this.syntax.unsupported);
        this.generateVariableSyntax(this.syntax.variables);

        this.syntax.operators.generateAliases();
    }

    /**
     * Fills out metadata on general properties.
     */
    protected abstract generateGeneralProperties(general: GeneralProperties): void;

    /**
     * Generates project-scale metadata.
     *
     * @param projects   A property container for project-scale metadata.
     */
    protected abstract generateProjectProperties(projects: ProjectProperties): void;

    /**
     * Generates metadata on arrays.
     *
     * @param arrays   A property container for metadata on arrays.
     */
    protected abstract generateArraySyntax(arrays: ArraySyntax): void;

    /**
     * Generates metadata on booleans.
     *
     * @param booleans   A property container for metadata on booleans.
     */
    protected abstract generateBooleanSyntax(booleans: BooleanSyntax): void;

    /**
     * Generates metadata on exported classes.
     *
     * @param members   A property container for metadata on exported classes.
     */
    protected abstract generateClassExportSyntax(exports: ClassExportSyntax): void;

    /**
     * Generates metadata on class generics.
     *
     * @param members   A property container for metadata on class generics.
     */
    protected abstract generateClassGenericSyntax(generics: ClassGenericSyntax): void;

    /**
     * Generates metadata on class member functions.
     *
     * @param functions   A property container for metadata on class member functions.
     */
    protected abstract generateClassMemberFunctionSyntax(functions: ClassMemberFunctionSyntax): void;

    /**
     * Generates metadata on class member variables.
     *
     * @param members   A property container for metadata on class member variables.
     */
    protected abstract generateClassMemberVariableSyntax(members: ClassMemberVariableSyntax): void;

    /**
     * Generates metadata on classes.
     *
     * @param classes   A property container for metadata on classes.
     */
    protected abstract generateClassSyntax(classes: ClassSyntax): void;

    /**
     * Generates metadata on class static functions.
     *
     * @param functions   A property container for metadata on class static functions.
     */
    protected abstract generateClassStaticFunctionSyntax(functions: ClassStaticFunctionSyntax): void;

    /**
     * Generates metadata on class static variables.
     *
     * @param members   A property container for metadata on class static variables.
     */
    protected abstract generateClassStaticVariableSyntax(variables: ClassStaticVariableSyntax): void;

    /**
     * Generates metadata on comments.
     *
     * @param comments   A property container for metadata on comments.
     */
    protected abstract generateCommentSyntax(comments: CommentSyntax): void;

    /**
     * Generates metadata on conditionals.
     *
     * @param conditionals   A property container for metadata on conditionals.
     */
    protected abstract generateConditionalSyntax(conditionals: ConditionalSyntax): void;

    /**
     * Generates metadata on dictionaries.
     *
     * @param dictionaries   A property container for metadata on dictionaries.
     */
    protected abstract generateDictionarySyntax(dictionaries: DictionarySyntax): void;

    /**
     * Generates metadata on enums.
     *
     * @param enums   A property container for metadata on enums.
     */
    protected abstract generateEnumSyntax(enums: EnumSyntax): void;

    /**
     * Generates metadata on exceptions.
     *
     * @param exceptions   A property container for metadata on exceptions.
     */
    protected abstract generateExceptionSyntax(exceptions: ExceptionSyntax): void;

    /**
     * Generates metadata on file contents.
     *
     * @param exceptions   A property container for metadata on file contents.
     */
    protected abstract generateFileSyntax(files: FileSyntax): void;

    /**
     * Generates metadata on functions.
     *
     * @param functions   A property container for metadata on functions.
     */
    protected abstract generateFunctionSyntax(functions: FunctionSyntax): void;

    /**
     * Generates metadata on imports.
     *
     * @param imports   A property container for metadata on imports.
     */
    protected abstract generateImportSyntax(lambdas: ImportSyntax): void;

    /**
     * Generates metadata on interfaces.
     *
     * @param interfaces   A property container for metadata on interfaces.
     */
    protected abstract generateInterfaceSyntax(lambdas: InterfaceSyntax): void;

    /**
     * Generates metadata on lambdas.
     *
     * @param lambdas   A property container for metadata on lambdas.
     */
    protected abstract generateLambdaSyntax(lambdas: LambdaSyntax): void;

    /**
     * Fills out metadata on lists.
     */
    protected abstract generateListSyntax(lists: ListSyntax): void;

    /**
     * Generates metadata on loops.
     *
     * @param loops   A property container for metadata on loops.
     */
    protected abstract generateLoopSyntax(loops: LoopSyntax): void;

    /**
     * Generates metadata on main execution areas.
     *
     * @param main   A property container for metadata on main execution areas.
     */
    protected abstract generateMainSyntax(main: MainSyntax): void;

    /**
     * Generates metadata on math.
     *
     * @param math   A property container for metadata on math.
     */
    protected abstract generateMathSyntax(math: MathSyntax): void;

    /**
     * Generates metadata on new object instantiation.
     *
     * @param newProp   A property container for metadata on new object instantiation.
     */
    protected abstract generateNewSyntax(newProp: NewSyntax): void;

    /**
     * Generates metadata on numbers.
     *
     * @param numbers   A property container for metadata on numbers.
     */
    protected abstract generateNewSyntax(newProp: NewSyntax): void;

    /**
     * Generates metadata on operators.
     *
     * @param operators   A property container for metadata on operators.
     */
    protected abstract generateOperatorSyntax(operators: OperatorSyntax): void;

    /**
     * Generates metadata on parameters.
     *
     * @param parameters    A property container for metadata on parameters.
     */
    protected abstract generateParameterSyntax(parameters: ParameterSyntax): void;

    /**
     * Generates metadata on printing.
     *
     * @param parameters    A property container for metadata on printing.
     */
    protected abstract generatePrintingSyntax(printing: PrintingSyntax): void;

    /**
     * Generates metadata on sets.
     *
     * @param parameters   A property container for metadata on sets.
     */
    protected abstract generateSetSyntax(sets: SetSyntax): void;

    /**
     * Generates metadata on standalone functions.
     *
     * @param parameters   A property container for metadata on standalone functions.
     */
    protected abstract generateStandaloneFunctionSyntax(standaloneFunctions: StandaloneFunctionSyntax): void;

    /**
     * Generates metadata on string formatting.
     *
     * @param strings   A property container for metadata on string formatting.
     */
    protected abstract generateStringFormatSyntax(formatting: StringFormatSyntax): void;

    /**
     * Generates metadata on strings.
     *
     * @param strings   A property container for metadata on strings.
     */
    protected abstract generateStringSyntax(strings: StringSyntax): void;

    /**
     * Generates metadata on string substrings.
     *
     * @param strings   A property container for metadata on string substrings.
     */
    protected abstract generateStringSubstringSyntax(substrings: StringSubstringSyntax): void;

    /**
     * Generates metadata on string-to-float conversions.
     *
     * @param toFloat   A property container for metadata on string-to-float conversions.
     */
    protected abstract generateStringToFloatSyntax(toFloat: StringToFloatSyntax): void;

    /**
     * Generates metadata on style.
     *
     * @param style   A property container for metadata on style.
     */
    protected abstract generateStyleSyntax(style: StyleSyntax): void;

    /**
     * Generates metadata on unsupported complaints.
     *
     * @param style   A property container for metadata on unsupported complaints.
     */
    protected abstract generateUnsupportedSyntax(style: UnsupportedSyntax): void;

    /**
     * Generates metadata on variables.
     *
     * @param variables   A property container for metadata on variables.
     */
    protected abstract generateVariableSyntax(variables: VariableSyntax): void;
}
