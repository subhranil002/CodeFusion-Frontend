import { useEffect, useMemo, useRef } from "react";
import Editor, { type BeforeMount } from "@monaco-editor/react";
import blackboard from "monaco-themes/themes/Blackboard.json";
import debounce from "debounce";
import { useDispatch, useSelector } from "react-redux";
import editorSocket from "../../configs/EditorSocketConfig";
import { setCode } from "../../redux/slices/EditorSlice";

type CodeEditorProps = {
    language: string;
    options?: any;
};

function CodeEditor({ language, options }: CodeEditorProps) {
    const { code } = useSelector((state: any) => state.editor);
    const dispatch = useDispatch();
    const isTyping = useRef(false);
    const timeout = useRef<number | null>(null);

    const handleMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme("blackboard", blackboard as any);
    };

    useEffect(() => {
        editorSocket.on("codeUpdate", (newCode: string) => {
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

    const debouncedChange = useMemo(
        () =>
            debounce((value: string | undefined) => {
                editorSocket.emit("codeChange", { code: value });
            }, 500),
        []
    );

    return (
        <Editor
            height="100%"
            width="100%"
            language={language}
            value={code}
            theme="blackboard"
            beforeMount={handleMount}
            onChange={(value) => {
                handleTyping();
                dispatch(setCode(value ?? ""));
                debouncedChange(value);
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
