import { useState } from "react";
import CodeEditor from "../components/CodePlayground/CodeEditor";
import Sidebar from "../components/CodePlayground/Sidebar";
import EditorHeader from "../components/CodePlayground/EditorHeader";

function CodePlayground() {
    const [value, setValue] = useState<string>("// Write code here...");
    const [language, setLanguage] = useState<string>("javascript");
    const [writeLock, setWriteLock] = useState(false);
    const [fontSize, setFontSize] = useState<number>(18);

    const handleChange = (e: string | undefined) => {
        if (!e) return;
        setValue(e);
    };

    return (
        <Sidebar>
            <div className="min-h-screen bg-base-200">
                {/* Main Content */}
                <div className="drawer-content flex flex-col h-screen">
                    {/* Editor Area */}
                    <div className="flex-1 p-4 lg:p-6">
                        <div className="bg-base-100 rounded-xl shadow-lg h-full overflow-hidden flex flex-col">
                            {/* Editor Header */}
                            <EditorHeader
                                language={language}
                                setLanguage={setLanguage}
                                writeLock={writeLock}
                                setWriteLock={setWriteLock}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                            {/* Editor Body */}
                            <div className="flex-1">
                                <CodeEditor
                                    language={language}
                                    value={value}
                                    handleChange={handleChange}
                                    options={{
                                        fontSize: fontSize,
                                        readOnly: writeLock,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default CodePlayground;
