from cs50 import get_int
import math
import re

# prompt for int
ccNumber = get_int("Number: ")

# calculate checksum -- copy of my solution in c.
# It can possibly be done quicker in python,
# but it works

xchecksum = ccNumber
issueCheck = str(ccNumber)

sum1 = 0
sum2 = 0
checksum = False
temp = 0

# sum digits for the check
while (xchecksum > 0):
    temp = xchecksum % 10

# get first number form right
    sum1 += temp
    xchecksum //= 10

# get second number from right
    temp = (xchecksum % 10) * 2
    if temp < 10:
        sum2 += temp
    else:
        sum2 += 1 + (temp % 10)
    xchecksum //= 10

# add both sums and calculate checksum
if((sum1 + sum2) % 10) == 0:
    checksum = True

# check number length
numlength = 0
xlength = str(ccNumber)
if(len(xlength) in range(12, 17)):
    numlength = True

# check issuer
# check first numbers for issuer; 4x visa 51-55 mastercard, 34 or 37 amex
if(checksum and numlength):
    if int(issueCheck[:2]) < 56 and int(issueCheck[:2]) > 50:
        print("MASTERCARD")
    elif int(issueCheck[:2]) <= 49 and int(issueCheck[:2]) >= 40:
        print("VISA")
    elif int(issueCheck[:2]) == 37 or int(issueCheck[:2]) == 34:
        print("AMEX")
    else:
        print("INVALID")
else:
    print("INVALID")
# print(checksum)
# print(numlength)