import { MESSAGES } from "../messages";
import { Course } from "../models/course";
import withStore, { CachableArgs } from "../with_store";

const addCourse =
  ({ courses_svc }: CachableArgs) =>
  (
    title: string,
    instructor: string,
    date: string,
    min_employee_count: number,
    max_employee_count: number
  ): string => {
    if (
      !title ||
      !instructor ||
      !date ||
      !min_employee_count ||
      !max_employee_count
    ) {
      return MESSAGES.INPUT_DATA_ERROR;
    }
    const milliseconds = new Date().getTime();
    const offering_id = courses_svc.genOfferingId(title, instructor);
    const course: Course = {
      title,
      instructor,
      date,
      min_employee_count,
      max_employee_count,
      offering_id,
      timestamp: milliseconds,
      status: true,
    };
    courses_svc.add(course);
    return offering_id;
  };

export default withStore<string|number>(addCourse);
