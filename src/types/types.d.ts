export type User = {
    name: string;
    isTyping: boolean;
};

export type Language = {
    id: number;
    name: string;
}

export type InitialState = {
    users: User[];
    code: string;
    currentLanguage: Language | null;
    languageList: Language[];
    terminalData: TerminalData | null;
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