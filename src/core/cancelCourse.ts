import withMechanics, { MyFn } from "../with_mechanics";

const cancelCourse =
  ({ employees_svc }: MyFn) =>
  (course_registration_id: string) => {
    const employees =employees_svc.employees.map(employee=> {
      if (employee.registration_id == course_registration_id) {
        employee.status = false;
      }
      return employee
    })
    employees_svc.replace(employees)
    return `${course_registration_id} CANCEL_ACCEPTED`;
  };


export default withMechanics(cancelCourse);
