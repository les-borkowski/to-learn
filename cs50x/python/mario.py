from cs50 import get_int

# prompt for input (1 to 8)
while True:
    height = get_int("Enter height between 1 and 8: ")
    if(height not in range(1, 9)):
        continue
    else:
        break
# get initial number of hashes and spaces
hash = 1
space = height - hash

# print pyramid

for i in range(height):
    print(" " * space, end="")
    print("#" * hash, end="")
    print("  ", end="")
    print("#" * hash, end="")
    print()
    # update values for next row
    hash += 1
    space -= 1