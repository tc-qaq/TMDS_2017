#coding: utf-8
import csv;
import math;

def Roll(file1,file2,file3,len):
    length = len;
    id    = []*length;
    pa    = [[] for i in range(length)];
    pb    = [[] for i in range(length)];
    distance = [[] for i in range(181)];
    i  = 0;
    for row in csv.reader(open(file1,'r',encoding="utf-8")):
        if(row[1] == 'x'):
            continue;
        else:
            id.append(row[0]);
            pa[i].append(row[1]);
            pa[i].append(row[2]);
            i = i+1;
    i  = 0;
    for row in csv.reader(open(file2,'r',encoding="utf-8")):
        if(row[1] == 'x'):
            continue;
        else:
            pb[i].append(row[1]);
            pb[i].append(row[2]);
            i = i+1;
    maxX1 = 0;minX1 = 1000;maxY1 = 0;minY1 = 1000;
    for j in range(0,length):
        if(maxX1 < float(pa[j][0])):
            maxX1 = float(pa[j][0]);
        if(maxY1 < float(pa[j][1])):
            maxY1 = float(pa[j][1]);
        if(minX1 > float(pa[j][0])):
            minX1 = float(pa[j][0]);
        if(minY1 > float(pa[j][1])):
            minY1 = float(pa[j][1]);
    norX1 = maxX1 - minX1;norY1 = maxY1 - minY1;
    for j in range(0,length):
        pa[j][0] = (float(pa[j][0])-minX1)/norX1;
        pa[j][1] = (float(pa[j][1])-minY1)/norY1;
    
    for j in range(0,181):
        res   = [[] for i in range(length)];
        for k in range(0,length):
            res[k].append(pb[k][0]);
            res[k].append(pb[k][1]);
        maxX2 = 0;minX2 = 1000;maxY2 = 0;minY2 = 1000; 
        for k in range(0,length):
            if(maxX2 < float(res[k][0])):
                maxX2 = float(res[k][0]);
            if(maxY2 < float(res[k][1])):
                maxY2 = float(res[k][1]);
            if(minX2 > float(res[k][0])):
                minX2 = float(res[k][0]);
            if(minY2 > float(res[k][1])):
                minY2 = float(res[k][1]);
        norX2 = maxX2 - minX2;    norY2 = maxY2 - minY2;
    
        for k in range(0,length):
            res[k][0] = (float(res[k][0])-minX2)/norX2;
            res[k][1] = (float(res[k][1])-minY2)/norY2;
            
        for k in range(0,length):
            resX = res[k][0];
            resY = res[k][1];
            if (j == 0):
                res[k][0] = resX;
                res[k][1] = resY;
            elif(j == 90):
                res[k][0] = 1-resX;
                res[k][1] = resY;
            elif(j == 180):
                res[k][0] = resX;
                res[k][1] = 1-resY;
            else:
                ascent = -math.tan(math.radians(j));
                d      = abs(ascent*(resX-0.5)+resY-0.5);
                newX   = (d+resX/ascent+ascent/2-resY+0.5)/(ascent+1/ascent);
                if (abs(newX - resX)<0.001):
                    newX = (-d+resX/ascent+ascent/2-resY+0.5)/(ascent+1/ascent);
                newY = (1/ascent)*(newX-resX)+resY;
                res[k][0] = newX;
                res[k][1] = newY;
        dis = 0;
               
        for k in range(0,length):
            dis = dis + math.pow(math.pow((pa[k][0]-res[k][0]),2) + math.pow((pa[k][1]-res[k][1]),2),0.5);

        distance[j].append(dis);
    #print(distance);
    index = 0;
    min   = 100;
    for j in range(0,181):
        if(min > distance[j][0]):
            min   = distance[j][0];
            index = j;
    print(index,file3);
    res   = [[] for i in range(length)];
    if(index == 0):
        for j in range(0,length):
            res[j].append(pb[j][0]);
            res[j].append(pb[j][1]);
    elif(index == 90):
        for j in range(0,length):
            res[j].append(maxX2-float(pb[j][0]));
            res[j].append(pb[j][1]);
    elif(index == 180):
        for j in range(0,length):
            res[j].append(pb[j][0]);
            res[j].append(maxY2-float(pb[j][1]));
    else:
        for j in range(0,length):
            resX = float(pb[j][0]);
            resY = float(pb[j][1]);
            ascent = math.tan(math.radians(index));
            d      = abs(resY-ascent*resX);
            newX   = (d-resX/ascent+resY)/(-ascent-1/ascent);
            if (abs(newX - resX)<0.001):
                newX = (-d-resX/ascent+resY)/(-ascent-1/ascent);
            newY = (-1/ascent)*(newX-resX)+resY;
            res[j].append(newX);
            res[j].append(newY);
        
    
    csv_file = open(file3,"w",newline='');
    csv_writer = csv.writer(csv_file,delimiter = ",");
    for i in range(0,length+1):
        if (i == 0):
            csv_writer.writerow(['id','x','y']);
        else:
            csv_writer.writerow([id[i-1],res[i-1][0],res[i-1][1]]);
    csv_file.close();
for i in range(1953,1977):
    if(i == 1953):
        Roll('total/point1953_total.csv', 'total/point1954_rotateDis.csv', 'total/point1954_rotateRoll.csv',29);
    else:
        Roll('total/point'+str(i)+'_rotateRoll.csv', 'total/point'+str(i+1)+'_rotateDis.csv', 'total/point'+str(i+1)+'_rotateRoll.csv',29);
        
       