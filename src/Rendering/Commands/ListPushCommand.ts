import { NativeCallSyntax } from "../Languages/Properties/Syntax/NativeCallSyntax";
import { CommandNames } from "../Names/CommandNames";
import { CommandMetadata } from "./Metadata/CommandMetadata";
import { SingleParameter } from "./Metadata/Parameters/SingleParameter";
import { NativeCallCommand } from "./NativeCallCommand";

/**
 * Adds an item to a list.
 */
export class ListPushCommand extends NativeCallCommand {
    /**
     * Metadata on the command.
     */
    private static metadata: CommandMetadata = new CommandMetadata(CommandNames.ListPush)
        .withDescription("Adds an item to a list")
        .withParameters([
            new SingleParameter("name", "The name of the list.", true),
            new SingleParameter("value", "An item to push into the list.", true),
        ]);

    /**
     * @returns Metadata on the command.
     */
    public getMetadata(): CommandMetadata {
        return ListPushCommand.metadata;
    }

    /**
     * @returns Metadata on how to perform the native call.
     */
    protected retrieveNativeCallSyntax(): NativeCallSyntax {
        return this.language.syntax.lists.push;
    }
}
