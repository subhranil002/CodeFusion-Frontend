export type User = {
    id: string;
    name: string;
    isTyping: boolean;
    avatar: string;
};

export type FormData = {
    userName: string;
    roomId: string[];
}

export type SidebarPropsType = {
    roomId: string;
    children: React.ReactNode;
};

export type TerminalData = {
    stdout: string | null;
    stderr: string | null;
    time: string | null;
    compile_output: string | null;
    status: {
        id: number | null;
        description: string | null;
    };
};