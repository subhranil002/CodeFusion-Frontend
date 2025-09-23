import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import editorSocket from "../../configs/EditorSocketConfig";
import { setTerminalData } from "../../redux/slices/RoomSlice";

function Terminal() {
    const dispatch = useDispatch();
    const { terminalData } = useSelector((state: any) => state.room);
    const [modifiedData, setModifiedData] = useState({
        stdout: [],
        compile_output: [],
        stderr: [],
    });

    useEffect(() => {
        editorSocket.on("updateTerminal", (data: any) => {
            dispatch(setTerminalData(data));
        });

        return () => {
            editorSocket.off("updateTerminal");
        };
    }, []);

    useEffect(() => {
        setModifiedData({
            stdout: [],
            compile_output: [],
            stderr: [],
        });
        if (terminalData?.stdout) {
            setModifiedData((prev) => ({
                ...prev,
                stdout: terminalData.stdout
                    .split("\n")
                    .filter((s: string) => s !== ""),
            }));
        }
        if (terminalData?.compile_output) {
            setModifiedData((prev) => ({
                ...prev,
                compile_output: terminalData.compile_output
                    .split("\n")
                    .filter((s: string) => s !== ""),
            }));
        }
        if (terminalData?.stderr) {
            setModifiedData((prev) => ({
                ...prev,
                stderr: terminalData.stderr
                    .split("\n")
                    .filter((s: string) => s !== ""),
            }));
        }
    }, [terminalData]);

    return (
        <div className="mockup-code rounded-t-none w-full h-34 md:h-44 overflow-y-auto p-4">
            {terminalData ? (
                <>
                    {terminalData?.status && (
                        <pre
                            data-prefix="$"
                            className={
                                terminalData?.status?.id === 3
                                    ? "bg-success text-success-content font-semibold"
                                    : "bg-error text-error-content font-semibold"
                            }
                        >
                            <code>{terminalData?.status?.description}</code>
                        </pre>
                    )}
                    {modifiedData?.stdout &&
                        modifiedData?.stdout.length > 0 &&
                        modifiedData?.stdout.map(
                            (line: string, index: number) => (
                                <pre
                                    data-prefix=">"
                                    className="text-success"
                                    key={index}
                                >
                                    <code>{line}</code>
                                </pre>
                            )
                        )}

                    {modifiedData?.compile_output &&
                        modifiedData?.compile_output.length > 0 &&
                        modifiedData?.compile_output.map(
                            (line: string, index: number) => (
                                <pre
                                    data-prefix="!"
                                    className="text-error"
                                    key={index}
                                >
                                    <code>{line}</code>
                                </pre>
                            )
                        )}

                    {modifiedData?.stderr &&
                        modifiedData?.stderr.length > 0 &&
                        modifiedData?.stderr.map(
                            (line: string, index: number) => (
                                <pre
                                    data-prefix="!"
                                    className="text-error"
                                    key={index}
                                >
                                    <code>{line}</code>
                                </pre>
                            )
                        )}

                    {terminalData?.status?.id === 3 && terminalData?.time && (
                        <pre data-prefix="~" className="text-info">
                            <code>
                                <span className="font-bold">Time: </span>
                                {terminalData.time} ms
                            </code>
                        </pre>
                    )}
                </>
            ) : (
                <pre data-prefix="$" className="text-warning">
                    <code>Run code to see output...</code>
                </pre>
            )}
        </div>
    );
}

export default Terminal;
