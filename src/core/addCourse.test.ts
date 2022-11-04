import { CoursesService } from "../services/course";
import addCourse from "./addCourse";


jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-11-03'));


describe('addCourse', () => {
    let addMock: jest.SpyInstance
    let genOfferingIdMock: jest.SpyInstance
    afterEach(() => {
        addMock.mockClear()
        genOfferingIdMock.mockClear()
    })
    beforeEach(() => {
        addMock = jest
        .spyOn(CoursesService.prototype, 'add')
        .mockImplementation(() => {
        }); 

        genOfferingIdMock = jest
        .spyOn(CoursesService.prototype, 'genOfferingId')
        .mockImplementation(() => {
            return "123"
        });
    });

    
      
    it("should return for invalid input", () => {
        const result = addCourse('GO', 'GRU', '16675708')
        expect(result).toBe('INPUT_DATA_ERROR')

    });  

    it("should call add method on course service", () => {
        addCourse('GO', 'GRU', '16675708', 1, 2)
        expect(addMock).toHaveBeenCalled();
        expect(addMock).toHaveBeenCalledWith({"date": "16675708", "instructor": "GRU", "max_employee_count": 2, "min_employee_count": 1, "title": "GO", "offering_id": "123", "status": true, "timestamp": 1667433600000})

    });  

    it("should call genOfferingId method on course service", () => {
        addCourse('GO', 'GRU', '16675708', 1, 2)
        expect(genOfferingIdMock).toHaveBeenCalledTimes(1);
        expect(genOfferingIdMock).toHaveBeenCalledWith("GO", "GRU")

    });    

    it("should return offering id", () => {
        const result = addCourse('GO', 'GRU', '16675708', 1, 2)
        expect(result).toBe('123')

    });    
})