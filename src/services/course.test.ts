import { CoursesService } from "./course"

describe('course service', () => {
    const svc = new CoursesService()
    it('should have add()', () => {
        expect(typeof svc.add).toBe('function')
    })

    it('should have findByOfferingId()', () => {
        expect(typeof svc.findByOfferingId).toBe('function')
    })

    it('should have genOfferingId()', () => {
        expect(typeof svc.genOfferingId).toBe('function')
    })

    it('should have courses object', () => {
        expect(typeof svc.courses).toBe('object')
    })

    it('should have courses object', () => {
        expect(typeof CoursesService.getInstance).toBe('function')
    })
})