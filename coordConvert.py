from __future__ import absolute_import, division, print_function, unicode_literals
import sys
import os

def main():
    print(sys.version, '\nType \'exit\' to quit.\n')
    python2 = sys.version_info[0] == 2
    history = {}
    while (True):
        topLeft = input("Top Left: ")
        if ('exit' in str(topLeft).lower()):
            os._exit(0) if python2 else quit()
        botRight = input('Bottom Right: ')
        if ('exit' in str(botRight).lower()):
            os._exit(0) if python2 else quit()
        if (not python2):
            topLeft = eval(topLeft)
            botRight = eval(botRight)
        length = abs(int(topLeft[0]) - int(botRight[0]))
        height = abs(int(topLeft[1]) - int(botRight[1]))
        if (height == 0 or length == 0):
            print('\nWARNING: A dimension is 0')
        scaleFactorX = round(length / 100, 3)
        scaleFactorY = round(height / 32, 3)
        placeAt = (int(topLeft[0]) + length / 2, int(topLeft[1]) + height / 2)

        print('\nStart: ', topLeft, '\nEnd: ', botRight, '\nLength: ', length, '\nX Scale Factor: ', scaleFactorX, '\nY Scale Factor: ',scaleFactorY , '\nPlace At: ', placeAt, '\n')

main()