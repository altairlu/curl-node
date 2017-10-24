process.stdout.write('123')
process.stdout.write('123')

let backspace = Array(3).fill('\b').join('')
process.stdout.write(backspace)
process.stdout.write('12345')