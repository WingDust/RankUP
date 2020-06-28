
import cv2
import re
import sys
import os

def getFrame(filePath,store):
    print(filePath,store)
    cap = cv2.VideoCapture(filePath)
    if (cap.isOpened()):
        (flag,frame)=cap.read()
       # filename = re.compile(r'[^\\/:*?"<>|\r\n]+$');
        #  filefullName = re.search(r'[^\\/:*?"<>|\r\n]+$',filePath)
        (filepath,tempfilename) = os.path.split(filePath)
        (filename,extension) = os.path.splitext(tempfilename)
        storepath=os.path.join(store,(filename+'.jpg'))

        if flag:
            #  cv2.imwrite(os.path.join(store,'1.jpg'),frame)
            cv2.imencode('.jpg',frame)[1].tofile(storepath)
            if os.path.exists(storepath):
                print('Done')


if __name__ == '__main__':
    #  for i in range(len(sys.argv)):
      #  print(sys.argv[i])

    getFrame(sys.argv[1],sys.argv[2])

