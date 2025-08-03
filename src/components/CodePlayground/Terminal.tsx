import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import editorSocket from "../../configs/EditorSocketConfig";
import { setTerminalData } from "../../redux/slices/EditorSlice";

function Terminal() {
    const dispatch = useDispatch();
    const { terminalData } = useSelector((state: any) => state.editor);

    useEffect(() => {
        editorSocket.on("updateTerminal", (data: any) => {
            dispatch(setTerminalData(data));
        });

        return () => {
            editorSocket.off("updateTerminal");
        };
    }, []);

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
                    {terminalData?.stdout && (
                        <pre data-prefix=">" className="text-success">
                            <code>
                                <span className="font-bold">Output: </span>
                                {terminalData.stdout}
                            </code>
                        </pre>
                    )}

                    {terminalData?.stderr && (
                        <pre data-prefix="!" className="text-error">
                            <code>
                                <span className="font-bold">Error: </span>
                                {terminalData.stderr}
                            </code>
                        </pre>
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
