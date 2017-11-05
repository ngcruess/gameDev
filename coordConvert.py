def main():
	history = {}
	while (True):
		topLeft = eval(input("Top Left: "))
		topRight = eval(input("Top Right: "))
		length = abs(topLeft[0] - topRight[0])
		scaleFactor = round(length / 100, 3)
		placeAt = (topLeft[0] + length /2, topLeft[1] + 16)

		print('Start: ', topLeft, '\nEnd: ', topRight, '\nLength: ', length, '\nScale Factor: ', scaleFactor, '\nPlace At: ', placeAt, '\n')

main()