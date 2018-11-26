import * as glob from "glob";
import * as path from "path";

import { IOutputGenerator } from "./index";
import { spawnAndCaptureOutput } from "./Spawning";

const ignoredMessages = [/Note: (.+) uses unchecked or unsafe operations.\nNote: Recompile with -Xlint:unchecked for details.\n/];

/**
 * Runs an output comparison test for a single GLS project in Java.
 */
export const testJavaGenerator: IOutputGenerator = async ({ projectDirectory, projectName }): Promise<string[]> => {
    try {
        await spawnAndCaptureOutput("javac", {
            args: ["-d", path.join(projectDirectory), "-nowarn", ...glob.sync(path.join(projectDirectory, "**/*.java"))],
        });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        let message = error.message.replace(/\r/g, "");

        for (const ignoredMessage of ignoredMessages) {
            message = message.replace(ignoredMessage, "").trim();
        }

        if (message !== "") {
            throw error;
        }
    }

    return spawnAndCaptureOutput("java", {
        args: [`${projectName.toLowerCase()}/Main`],
        cwd: projectDirectory,
    });
};
