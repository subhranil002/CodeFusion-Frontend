export type User = {
    name: string;
    isTyping: boolean;
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
    status: {
        id: number | null;
        description: string | null;
    };
};