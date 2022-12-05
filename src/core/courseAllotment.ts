import { MESSAGES } from "../messages";
import { CourseStatus } from "../models/course";
import withStore, { CachableArgs } from "../with_store";

const courseAllotment =
  ({ employees_svc, courses_svc }: CachableArgs) =>
  (courseOfferingId: string, limit: number): string => {
    const course = courses_svc.findByOfferingId(courseOfferingId);
    if (!course) {
      return MESSAGES.INPUT_DATA_ERROR;
    }
    const employees = employees_svc.employees
      .filter((employee) => employee.course_id === courseOfferingId)
      .sort((a, b) => a.registration_id.localeCompare(b.registration_id));

    let courseStatus = CourseStatus.CONFIRMED;
    if (employees.length < course.min_employee_count) {
      courseStatus = CourseStatus.CANCELED;
    }

    let result: string = "";
    employees.forEach((employee) => {
      if (employee.status) {
        result += `${employee.registration_id} ${employee.email} ${
          employee.course_id
        } ${course.title} ${
          course.instructor + " " + course.date
        } ${courseStatus}\n`;
      }
    });
    return result;
  };

export default withStore<string>(courseAllotment);
