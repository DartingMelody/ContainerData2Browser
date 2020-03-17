import sys
mode = sys.argv[1]

if __name__ == '__main__':
    print("in main with command to run {}".format(mode))
    if mode == "fetch":
        # perform fetch here
        print("in fetch")
    elif mode == "executeAll":
        #perform execute for all cases
        print("execute all")
    elif mode == "execute":
        # perform execute here
        print("in execute")
        cases = sys.argv[2] # cases separated by comma like {sr1,sr2}
        print("string length {}".format(len(sys.argv)))
        print("String cases {}".format(sys.argv[2]))
