import { EmployeeService } from "./employee"

describe('employee service', () => {
    const svc = new EmployeeService()
    it('should have add()', () => {
        expect(typeof svc.add).toBe('function')
    })

    it('should have replace()', () => {
        expect(typeof svc.replace).toBe('function')
    })

    it('should have genRegistrationId()', () => {
        expect(typeof svc.genRegistrationId).toBe('function')
    })

    it('should have employees object', () => {
        expect(typeof svc.employees).toBe('object')
    })

    it('should have employees object', () => {
        expect(typeof EmployeeService.getInstance).toBe('function')
    })
})