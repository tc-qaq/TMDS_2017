#coding: utf-8
import csv;
import math;


def calDiff(filename1,filename2):
    length = 29;
    id    = []*length;
    pa    = [[] for i in range(length)];
    pb    = [[] for i in range(length)];
    res   = [[] for i in range(length)];
    alfas = []*length;
    negaC = 0;
    i  = 0;
    for row in csv.reader(open(filename1,'r',encoding="utf-8")):
        if(row[1] == 'x'):
            continue;
        else:
            id.append(row[0]);
            pa[i].append(row[1]);
            pa[i].append(row[2]);
            i = i+1;
    i  = 0;
    for row in csv.reader(open(filename2,'r',encoding="utf-8")):
        if(row[1] == 'x'):
            continue;
        else:
            pb[i].append(row[1]);
            pb[i].append(row[2]);
            i = i+1;
    maxX1 = 0;    maxX2 = 0;    minX1 = 1000;    minX2 = 1000;
    maxY1 = 0;    maxY2 = 0;    minY1 = 1000;    minY2 = 1000; 
    for j in range(0,length):
        if(maxX1 < float(pa[j][0])):
            maxX1 = float(pa[j][0]);
        if(maxX2 < float(pb[j][0])):
            maxX2 = float(pb[j][0]);
        if(maxY1 < float(pa[j][1])):
            maxY1 = float(pa[j][1]);
        if(maxY2 < float(pb[j][1])):
            maxY2 = float(pb[j][1]);
        if(minX1 > float(pa[j][0])):
            minX1 = float(pa[j][0]);
        if(minX2 > float(pb[j][0])):
            minX2 = float(pb[j][0]);
        if(minY1 > float(pa[j][1])):
            minY1 = float(pa[j][1]);
        if(minY2 > float(pb[j][1])):
            minY2 = float(pb[j][1]);
    norX1 = maxX1 - minX1;    norY1 = maxY1 - minY1;
    norX2 = maxX2 - minX2;    norY2 = maxY2 - minY2;
    
    for j in range(0,length):
        pa[j][0] = (float(pa[j][0])-minX1)/norX1;
        pa[j][1] = (float(pa[j][1])-minY1)/norY1;
        pb[j][0] = (float(pa[j][0])-minX2)/norX2;
        pb[j][1] = (float(pa[j][1])-minY2)/norY2;
    
    for j in range(0,length):
        res[j].append(math.pow(math.pow((pa[j][0]-pb[j][0]),2) + math.pow((pa[j][1]-pb[j][1]),2),0.5));
    sum = 0;
    for j in range(0,length):
        sum = sum + res[j][0]/length
    return sum;



year1 = 25;
means = [];
for i in range(1953,1977):
    means.append(calDiff('total/point'+str(i)+'_total.csv','total/point'+str(i+1)+'_total.csv'));

csv_file = open("means.csv","w",newline='');
csv_writer = csv.writer(csv_file,delimiter = ",");
for i in range(0,24):
    csv_writer.writerow([means[i]]);
csv_file.close();

means = [];
for i in range(1953,1977):
    if(i == 1953):
        means.append(calDiff('total/point'+str(i)+'_total.csv','total/point'+str(i+1)+'_rotateDis.csv'));
    else:
        means.append(calDiff('total/point'+str(i)+'_rotateDis.csv','total/point'+str(i+1)+'_rotateDis.csv'))
csv_file = open("meansDis.csv","w",newline='');
csv_writer = csv.writer(csv_file,delimiter = ",");
for i in range(0,24):
    csv_writer.writerow([means[i]]);
csv_file.close();
