export function InputField({ ...props }) {
  return (
    <input
      className="w-full border border-indigo-200 p-2 rounded-md focus:outline-none focus:border-indigo-700"
      {...props}
    />
  );
}
