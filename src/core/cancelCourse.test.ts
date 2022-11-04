import { Employee } from "../models/employee";
import { CoursesService } from "../services/course";
import { EmployeeService } from "../services/employee";
import addCourse from "./addCourse";
import cancelCourse from "./cancelCourse";

jest.useFakeTimers().setSystemTime(new Date("2022-11-03"));

describe("cancelCourse", () => {
  let replaceMock: jest.SpyInstance;
  let employeesMock: jest.SpyInstance;
  afterEach(() => {
    replaceMock.mockClear();
    employeesMock.mockClear();
  });
  beforeEach(() => {
    employeesMock = jest
      .spyOn(EmployeeService.prototype, 'employees', 'get')
      .mockImplementation(() => {
        const list: Employee[]= [
          {
            email: "gru@minions.com",
            registration_id: "COURSE-RUBY-LANG-STUART",
            course_id: "c123",
            status: true,
          },
        ];
        return list
      });

      replaceMock = jest
      .spyOn(EmployeeService.prototype, "replace")
  });


  it("should return cancelled status", () => {
    const result = cancelCourse("COURSE-RUBY-LANG-STUART");
    expect(result).toBe("COURSE-RUBY-LANG-STUART CANCEL_ACCEPTED");
    expect(employeesMock).toHaveBeenCalledTimes(1);

  });

    it("should call replace on Employee service", () => {
    cancelCourse("COURSE-RUBY-LANG-STUART");
    expect(replaceMock).toHaveBeenCalledTimes(1);
  });

  it("should update status for valid employee registration id", () => {
    cancelCourse("COURSE-RUBY-LANG-STUART");
    
    expect(employeesMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith([{"registration_id": "COURSE-RUBY-LANG-STUART", "course_id": "c123", "email": "gru@minions.com", "status": false}])


  });

  it("should not update status for invalid employee registration id", () => {
    const result = cancelCourse("COURSE-RUBY-LANG-GRU");
    
    expect(employeesMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith([{"registration_id": "COURSE-RUBY-LANG-STUART", "course_id": "c123", "email": "gru@minions.com", "status": true}])

  });

});
