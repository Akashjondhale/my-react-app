import { useEffect, useState } from 'react'
import type { Student } from '../model/Student';
import { StudentData, DeletedStudentData, addStudent, updateStudent } from '../services/studentService';

export const Task9_FakeApi = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStudentID, setEditStudentID] = useState<number | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await StudentData();
        setStudents(data);
      } catch {
        console.error("API ERROR");
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await DeletedStudentData(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (student: Student) => {
    setIsEditMode(true);
    setEditStudentID(student.id);
    setName(student.name);
    setAge(student.age.toString());
    setIsModalOpen(true);
  };

  const handleAddStudent = async () => {
    if (!name.trim() || !age) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const newStudent = await addStudent({
        name,
        age: Number(age)
      });

      setStudents(prev => [...prev, newStudent]);
      resetForm();
    } catch (error) {
      console.error("Add student failed", error);
    }
  };

  const handleUpdateStudent = async () => {
    if (!name.trim() || !age || editStudentID === null) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const updatedStudent = await updateStudent(editStudentID, {
        id: editStudentID,
        name,
        age: Number(age)
      });

      setStudents(prev => prev.map(s => s.id === editStudentID ? updatedStudent : s));
      resetForm();
    } catch (error) {
      console.error("Update student failed", error);
    }
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      await handleUpdateStudent(); // Calls PUT API
    } else {
      await handleAddStudent(); // Calls POST API
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditStudentID(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Student Management</h2>
          <button 
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Student
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No students found. Add your first student!
                  </td>
                </tr>
              ) : (
                students.map((s, index) => (
                  <tr
                    key={s.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">{s.id}</td>
                    <td className="px-6 py-4 text-gray-800">{s.name}</td>
                    <td className="px-6 py-4 text-gray-800">{s.age}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          title="Edit"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)} 
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? "Edit Student" : "Add New Student"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter student age"
                    min="1"
                    max="120"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}