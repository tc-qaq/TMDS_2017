function geoTra(filename,year)
%实现 几何变换
    
    if year == 1954
        pa = csvread('total/point1953_total.csv',1,1);
    else
        pa = csvread(['total/point',num2str(year-1),'_rotate.csv'],1,1);
    end;
    pb  = csvread(filename,1,1);
    n=size(pb,1);
    alphas = zeros(n,1);
    negaCount =0;
    for i = 1:n
        dotA  = pa(i,1)*pb(i,1)+pa(i,2)*pb(i,2);
        lAB   = (pa(i,1)^2+pa(i,2)^2)^0.5 * (pb(i,1)^2+pb(i,2)^2)^0.5;
        costheta = dotA/lAB;
        alpha = acos(costheta);
        if pa(i,1)>pb(i,1)
            alpha = -alpha;
            negaCount = negaCount + 1;
        end
        alphas(i,1) = alpha;
    end
    sortA  = sort(alphas);
    sum = 0;
    if negaCount >= n/2
        for i = 1:n
            if i == 1
                sum = sum + sortA(i,1);
            else 
                if sortA(i-1,1)*sortA(i,1) <0
                    break;
                else
                    sum = sum + sortA(i,1);
                    means= sum/i;
                end
            end
        end
    else
         for i = 1:n
            if i == 1
                sum = sum + sortA(n-i+1,1);
            else 
                if sortA(n-i,1)*sortA(n-i+1,1) <0
                    break;
                else
                    sum = sum + sortA(n-i+1,1);
                    means= sum/(n-i+1);
                end
            end
        end
    end
    res = zeros(n,2);
    for i = 1:n
        res(i,1) = cos(means)*pb(i,1)-sin(means)*pb(i,2);
        res(i,2) = sin(means)*pb(i,1)+cos(means)*pb(i,2);
    end
    csvwrite(['total/point',num2str(year),'_rotate.csv'],res);
    fid = fopen(filename);
    title = textscan(fid, '%s %s %s',1,'delimiter', ',');
    Y = textscan(fid, '%s  %f %f','delimiter', ',');
    fclose(fid);
    dcellneeds1 = Y(1:1);
    str=(dcellneeds1(1));
    str= str{1};
    columns = {'id', 'x', 'y'};
    data = table(str,res(:,1),res(:,2), 'VariableNames', columns); % 基于这些单独的变量创建一个table类型变量data
    writetable(data, ['total/point',num2str(year),'_rotate.csv'])
end