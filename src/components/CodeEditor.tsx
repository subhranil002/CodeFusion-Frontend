import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import debounce from "debounce";

type CodeEditorProps = {
    language: string;
    value?: string;
    handleChange: (e: string | undefined) => void;
    options?: any;
};

function CodeEditor({
    language,
    value,
    handleChange,
    options,
}: CodeEditorProps) {
    const [themeJson, setThemeJson] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/Dracula.json");
            const json = await res.json();
            setThemeJson(json);
        })();
    }, []);

    function handleEditorTheme(
        editor: any,
        monaco: typeof import("monaco-editor")
    ) {
        if (!themeJson) return;
        monaco.editor.defineTheme("dracula", themeJson);
        monaco.editor.setTheme("dracula");
    }

    console.log(language);
    

    return (
        themeJson && (
            <Editor
                height="100%"
                width="100%"
                defaultLanguage={language}
                defaultValue={value ?? "// Write code here..."}
                onMount={handleEditorTheme}
                onChange={debounce(handleChange, 500)}
                options={{
                    wordWrap: "on",
                    fontFamily: "monospace",
                    quickSuggestions: true,
                    formatOnType: true,
                    formatOnPaste: true,
                    automaticLayout: true,
                    ...options,
                }}
            />
        )
    );
}

export default CodeEditor;
