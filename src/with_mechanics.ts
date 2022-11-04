import { Course } from "./models/course";
import { Employee } from "./models/employee";
import { CoursesService } from "./services/course";
import { EmployeeService } from "./services/employee";

export type MyFn = ({ courses_svc: CoursesService, employees_svc: EmployeeService})

const withMechanics = (fn: (args: MyFn) => Function) => {
    const courses_svc = CoursesService.getInstance();
    const employees_svc = EmployeeService.getInstance();

    return (...props: any) => {
        return fn({ courses_svc, employees_svc })(...props)
    }
}

export default withMechanics