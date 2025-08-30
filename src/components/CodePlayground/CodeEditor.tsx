import Editor, { type BeforeMount } from "@monaco-editor/react";
import blackboard from "monaco-themes/themes/Blackboard.json";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import editorSocket from "../../configs/EditorSocketConfig";
import { setCode } from "../../redux/slices/RoomSlice";

function CodeEditor({ options }: any) {
    const dispatch = useDispatch();
    const isTyping = useRef(false);
    const isRemoteUpdate = useRef(false);
    const timeout = useRef<number | null>(null);
    const { languageName, code } = useSelector((state: any) => state.room);

    const handleMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme("blackboard", blackboard as any);
    };

    useEffect(() => {
        editorSocket.on("codeUpdate", (newCode: string) => {
            isRemoteUpdate.current = true;
            dispatch(setCode(newCode));
        });

        return () => {
            editorSocket.off("codeUpdate");
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    function handleTyping() {
        if (!isTyping.current) {
            editorSocket.emit("startTyping");
            isTyping.current = true;
        }

        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            editorSocket.emit("stopTyping");
            isTyping.current = false;
        }, 500);
    }

    const codeChange = (value: string | undefined) =>
        editorSocket.emit("codeChange", { code: value });

    return (
        <Editor
            height="100%"
            width="100%"
            language={languageName.toLowerCase()}
            value={code}
            theme="blackboard"
            beforeMount={handleMount}
            onChange={(value) => {
                if (isRemoteUpdate.current) {
                    isRemoteUpdate.current = false;
                    return;
                }

                handleTyping();
                dispatch(setCode(value ?? ""));
                codeChange(value);
            }}
            options={{
                wordWrap: "on",
                fontFamily: "monospace",
                quickSuggestions: true,
                formatOnType: true,
                formatOnPaste: true,
                automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                ...options,
            }}
        />
    );
}

export default CodeEditor;
