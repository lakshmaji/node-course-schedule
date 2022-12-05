import withStore, { CachableArgs } from "../with_store";

const cancelCourse =
  ({ employees_svc }: CachableArgs) =>
  (course_registration_id: string): string => {
    const employees =employees_svc.employees.map(employee=> {
      if (employee.registration_id == course_registration_id) {
        employee.status = false;
      }
      return employee
    })
    employees_svc.replace(employees)
    return `${course_registration_id} CANCEL_ACCEPTED`;
  };


export default withStore<string>(cancelCourse);
