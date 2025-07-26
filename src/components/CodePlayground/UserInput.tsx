function UserInput({ userInputValue, setUserInputValue, runCode }: any) {
    return (
        <dialog id="user_input_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">User Input :</h3>
                <textarea
                    placeholder="Enter your input here..."
                    className="textarea textarea-info w-full resize-none"
                    value={userInputValue}
                    onChange={(e) => setUserInputValue(e.target.value)}
                ></textarea>
                <div className="modal-action">
                    <form method="dialog">
                        <div className="flex gap-3">
                            <button className="btn btn-sm btn-error">
                                Close
                            </button>
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={() => runCode()}
                            >
                                Run Code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default UserInput;
