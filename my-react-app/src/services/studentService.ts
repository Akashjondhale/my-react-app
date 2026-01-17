import axios from "axios";
import type { Student, ApiResponse } from "../model/Student";

const API_URL = "https://localhost:7124/api/students";

// Get all students
export const StudentData = async (): Promise<Student[]> => {
  const response = await axios.get<ApiResponse<Student[]>>(
    `${API_URL}/GetStudentId/0`
  );
  return response.data.data;
};

// Delete student
export const DeletedStudentData = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/Delete/${id}`);
};

// Add new student - POST API
export const addStudent = async (student: { name: string; age: number }): Promise<Student> => {
  const response = await axios.post<ApiResponse<Student>>(
    `${API_URL}/Add`, 
    student
  );
  return response.data.data;
};

// Update existing student - PUT API
export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const response = await axios.put<ApiResponse<Student>>(
    `${API_URL}/Update/${id}`, 
    student
  );
  return response.data.data;
};