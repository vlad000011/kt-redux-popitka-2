import { setupWorker, http, HttpResponse } from 'msw'
export const handlers = [
  http.get('/fakeServer/students', () => {
    return HttpResponse.json([])
  }),
  http.get('/fakeServer/teachers', () => {
    return HttpResponse.json([])
  }),
  http.post('/fakeServer/students', async ({ request }) => {
    const data = await request.json()
    return HttpResponse.json(data)
  }),
]
export const worker = setupWorker(...handlers)