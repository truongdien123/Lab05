import { useLocation } from "react-router-dom"

export const UserDetail = () => {
    const location = useLocation();
    const student = location.state;

    return(
        <div>
            <h2>Student name: {student.name}</h2>
            <h2>Student code: {student.studentCode}</h2>
            <h2>Student active: {student.isActive}</h2>
        </div>
    )
}