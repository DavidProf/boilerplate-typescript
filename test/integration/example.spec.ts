describe('integration example', () => {
    it('NODE_ENV should be test', () => {
        expect(process.env.NODE_ENV).toBe('test')
    })
})
