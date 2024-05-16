import axios from "axios";
import {} from "react";
import UpdateForm from "./_components/updateForm";
//@types
interface ParamType {
  updateUser: string;
}
const fetchSingleUser = async (updateUser: string) => {
  try {
    const response = await axios.get(
      `http://localhost:9000/api/v1/auth/user/getSingleUser/${updateUser}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQyMzRmNTllOWZlNjY0MGFiZWE3MzEiLCJpYXQiOjE3MTU3MDUzMzcsImV4cCI6MTcxNjMxMDEzN30.JjKzzmJA6xfUbddHMAqx1b5okDWXUuTHvBM3s46SYVI",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
async function UpdateUser({ params }: { params: ParamType }) {
  const { updateUser } = params;
  const user = await fetchSingleUser(updateUser);
  // console.log(user);
  return (
    <>
      <section>
        <UpdateForm user={user} />
      </section>
    </>
  );
}

export default UpdateUser;
