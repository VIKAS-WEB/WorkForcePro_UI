import api from "./api";

export type Employee = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  employeeIdNumber: string;
  department: string;
  designation: string;
  salary: number | null;
  shift: string;

  // Optional frontend-only
  profileImage?: string;
  status?: string;
};


export const fetchEmployees = async () => {
  const res = await api.get("/api/employees/FetchEmployeeList");
  return res.data;
};

export type NewEmployee = Omit<Employee, "id" | "status">;

export const addEmployee = async (employeeData: NewEmployee) => {
  const res = await api.post("/api/employees/AddEmployee", employeeData);
  return res.data;
};

export const uploadEmployeeImage = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post(`/api/employees/${id}/uploadImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

