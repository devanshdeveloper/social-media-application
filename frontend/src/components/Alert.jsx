export default function Alert({ text, onSuccess, onCancel, setAlert }) {
  return (
    <div
      className={`fixed ${
        text ? "bottom-6" : "bottom-[-100%]"
      } right-0 px-4 lg:px-6 transform transition-all duration-200 z-50 w-full `}
    >
      <div className="w-full pr-4 pl-5 py-5 bg-brand-900 rounded-lg flex items-center justify-between">
        <p className="text-brand-100 text-sm">{text}</p>
        <div className="flex space-x-3">
          <button
            className="btn"
            onClick={() => {
              setAlert({ text: "" });
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              setAlert({ text: "" });
              onSuccess();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
