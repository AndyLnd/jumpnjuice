const canvas: HTMLCanvasElement = document.querySelector('canvas')!
canvas.width = 800
canvas.height = 500

const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

ctx.font = '70px sans-serif'
ctx.textAlign = 'center'
ctx.textBaseline = 'bottom'
ctx.save()
ctx.scale(-1, 1)
ctx.fillText('🏃‍♂️', -canvas.width / 3, canvas.height)
ctx.restore()
ctx.font = '50px sans-serif'
ctx.fillText('🛴', (canvas.width / 3) * 2, canvas.height)
