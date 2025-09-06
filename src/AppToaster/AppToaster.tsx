import { Toaster } from "react-hot-toast";

function AppToaster() {
    return (
        <Toaster
            toastOptions={{
                style: {
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                },
                success: {
                    style: {
                        borderLeft: "4px solid #16a34a",
                        background: "#ffffff",
                    },
                    iconTheme: { primary: "#16a34a", secondary: "#fff" },
                },
                error: {
                    style: {
                        borderLeft: "4px solid #ef4444",
                        background: "#fff",
                    },
                    iconTheme: { primary: "#ef4444", secondary: "#fff" },
                },
            }}
        />
    );
}

export default AppToaster;
