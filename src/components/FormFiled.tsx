import { useFormik } from "formik";
import * as yup from "yup";

interface FormValues {
  todo: string;
}
interface FormFiledProps {
  onTodo: (todo: string) => void;
}
function FormFiled({ onTodo }: FormFiledProps) {
  const validationSchema = yup.object({
    todo: yup.string().required("This field is required"),
  });
  const formik = useFormik<FormValues>({
    initialValues: {
      todo: "",
    },
    validationSchema,
    onSubmit: (values: FormValues, { resetForm }) => {
      console.log("values:", values);
      onTodo(values.todo);
      resetForm();
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
        <div className=" w-6/12 mx-auto relative">
          <input
            type="text"
            name="todo"
            placeholder="what are you doing??"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.todo}
            className="border border-[#b9b9b9] w-full focus:outline-none rounded-3xl py-3 px-5 "
          />
          <button
            type="submit"
            className="bg-red-400 rounded-3xl px-6 py-2 absolute right-3 cursor-pointer top-1"
          >
            Go
          </button>
        </div>
        <div className="w-6/12 mx-auto text-sm">
          {formik.touched.todo && formik.errors.todo ? (
            <div style={{ color: "red" }}>{formik.errors.todo}</div>
          ) : null}
        </div>
      </form>
    </>
  );
}

export default FormFiled;
