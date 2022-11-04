import { MESSAGES } from "../messages";
import { Employee } from "../models/employee";
import withMechanics, { MyFn } from "../with_mechanics";


const registerCourse = ({ employees_svc, courses_svc }:  MyFn) => (email: string, courseOfferingId: string) => {
    if (!email || !courseOfferingId) {
        return MESSAGES.INPUT_DATA_ERROR;
    }
    let course = courses_svc.findByOfferingId(courseOfferingId);
    if (!course) {
        return MESSAGES.INPUT_DATA_ERROR;
    }
    const [name] = email.split("@");
    const registration_id = employees_svc.genRegistrationId(name, course.title)
    const employee: Employee = {
        email,
        registration_id,
        course_id: course.offering_id,
        status:true
    }
    if (employees_svc.employees.length <course.max_employee_count) {
        employees_svc.add(employee)
    }
    else {
        return MESSAGES.COURSE_FULL_ERROR
    }
    return registration_id + ' ACCEPTED';
}

export default withMechanics(registerCourse)