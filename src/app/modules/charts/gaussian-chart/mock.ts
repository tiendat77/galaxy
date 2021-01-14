import * as d3 from 'd3';

interface HISTOGRAM {
  x0: number;
  x1: number;
  y: number;
};

const WEATHER: any[] = [
  {
    time: 1545109200,
    humidity: 0.54,
    temperatureHigh: 44.26,
    temperatureLow: 25.11
  },
  {
    time: 1545195600,
    humidity: 0.77,
    temperatureHigh: 47.21,
    temperatureLow: 29.37
  },
  {
    time: 1545282000,
    humidity: 0.95,
    temperatureHigh: 41.3,
    temperatureLow: 40.31
  },
  {
    time: 1545368400,
    humidity: 0.94,
    temperatureHigh: 63.89,
    temperatureLow: 40.25
  },
  {
    time: 1545454800,
    humidity: 0.72,
    temperatureHigh: 48.15,
    temperatureLow: 31.16
  },
  {
    time: 1545541200,
    humidity: 0.74,
    temperatureHigh: 48,
    temperatureLow: 36.44
  },
  {
    time: 1545627600,
    humidity: 0.7,
    temperatureHigh: 44.82,
    temperatureLow: 30.69
  },
  {
    time: 1545714000,
    humidity: 0.65,
    temperatureHigh: 40.61,
    temperatureLow: 25.61
  },
  {
    time: 1545800400,
    humidity: 0.75,
    temperatureHigh: 46.73,
    temperatureLow: 27.28
  },
  {
    time: 1545886800,
    humidity: 0.77,
    temperatureHigh: 50.26,
    temperatureLow: 41.19
  },
  {
    time: 1545973200,
    humidity: 0.98,
    temperatureHigh: 51.23,
    temperatureLow: 45
  },
  {
    time: 1546059600,
    humidity: 0.79,
    temperatureHigh: 51.09,
    temperatureLow: 32.54
  },
  {
    time: 1546146000,
    humidity: 0.8,
    temperatureHigh: 47.15,
    temperatureLow: 32.05
  },
  {
    time: 1546232400,
    humidity: 0.97,
    temperatureHigh: 45.31,
    temperatureLow: 44.27
  },
  {
    time: 1546318800,
    humidity: 0.79,
    temperatureHigh: 59.42,
    temperatureLow: 37.65
  },
  {
    time: 1546405200,
    humidity: 0.8,
    temperatureHigh: 44.99,
    temperatureLow: 40.41
  },
  {
    time: 1546491600,
    humidity: 0.78,
    temperatureHigh: 47.45,
    temperatureLow: 29.67
  },
  {
    time: 1546578000,
    humidity: 0.88,
    temperatureHigh: 48.23,
    temperatureLow: 42.43
  },
  {
    time: 1546664400,
    humidity: 0.89,
    temperatureHigh: 50.51,
    temperatureLow: 38.79
  },
  {
    time: 1546750800,
    humidity: 0.67,
    temperatureHigh: 52.15,
    temperatureLow: 30.4
  },
  {
    time: 1546837200,
    humidity: 0.68,
    temperatureHigh: 37.54,
    temperatureLow: 33.62
  },
  {
    time: 1546923600,
    humidity: 0.88,
    temperatureHigh: 55.22,
    temperatureLow: 40.93
  },
  {
    time: 1547010000,
    humidity: 0.59,
    temperatureHigh: 44.62,
    temperatureLow: 27.3
  },
  {
    time: 1547096400,
    humidity: 0.53,
    temperatureHigh: 35.03,
    temperatureLow: 24.39
  },
  {
    time: 1547182800,
    humidity: 0.58,
    temperatureHigh: 36.35,
    temperatureLow: 24.76
  },
  {
    time: 1547269200,
    humidity: 0.74,
    temperatureHigh: 35.21,
    temperatureLow: 27.21
  },
  {
    time: 1547355600,
    humidity: 0.96,
    temperatureHigh: 30.59,
    temperatureLow: 23.36
  },
  {
    time: 1547442000,
    humidity: 0.8,
    temperatureHigh: 34.61,
    temperatureLow: 20.55
  },
  {
    time: 1547528400,
    humidity: 0.86,
    temperatureHigh: 35.89,
    temperatureLow: 19.2
  },
  {
    time: 1547614800,
    humidity: 0.86,
    temperatureHigh: 39.38,
    temperatureLow: 28.01
  },
  {
    time: 1547701200,
    humidity: 0.82,
    temperatureHigh: 35.29,
    temperatureLow: 30.32
  },
  {
    time: 1547787600,
    humidity: 0.96,
    temperatureHigh: 39.56,
    temperatureLow: 30.85
  },
  {
    time: 1547874000,
    humidity: 0.94,
    temperatureHigh: 37.52,
    temperatureLow: 34.84
  },
  {
    time: 1547960400,
    humidity: 0.78,
    temperatureHigh: 39.71,
    temperatureLow: 9.41
  },
  {
    time: 1548046800,
    humidity: 0.52,
    temperatureHigh: 19.45,
    temperatureLow: 10
  },
  {
    time: 1548133200,
    humidity: 0.61,
    temperatureHigh: 31.99,
    temperatureLow: 26.41
  },
  {
    time: 1548219600,
    humidity: 0.68,
    temperatureHigh: 47.15,
    temperatureLow: 42.45
  },
  {
    time: 1548306000,
    humidity: 0.87,
    temperatureHigh: 57.13,
    temperatureLow: 28.46
  },
  {
    time: 1548392400,
    humidity: 0.61,
    temperatureHigh: 37.38,
    temperatureLow: 20.39
  },
  {
    time: 1548478800,
    humidity: 0.63,
    temperatureHigh: 38.21,
    temperatureLow: 23.25
  },
  {
    time: 1548565200,
    humidity: 0.7,
    temperatureHigh: 47.66,
    temperatureLow: 26.26
  },
  {
    time: 1548651600,
    humidity: 0.5,
    temperatureHigh: 35.97,
    temperatureLow: 26.22
  },
  {
    time: 1548738000,
    humidity: 0.83,
    temperatureHigh: 37.5,
    temperatureLow: 15.07
  },
  {
    time: 1548824400,
    humidity: 0.63,
    temperatureHigh: 30.91,
    temperatureLow: 4.03
  },
  {
    time: 1548910800,
    humidity: 0.46,
    temperatureHigh: 21.49,
    temperatureLow: 11.55
  },
  {
    time: 1548997200,
    humidity: 0.78,
    temperatureHigh: 21.98,
    temperatureLow: 11.93
  },
  {
    time: 1549083600,
    humidity: 0.84,
    temperatureHigh: 36.79,
    temperatureLow: 24.77
  },
  {
    time: 1549170000,
    humidity: 0.84,
    temperatureHigh: 50.08,
    temperatureLow: 28.97
  },
  {
    time: 1549256400,
    humidity: 0.81,
    temperatureHigh: 59.41,
    temperatureLow: 37.21
  },
  {
    time: 1549342800,
    humidity: 0.8,
    temperatureHigh: 68.42,
    temperatureLow: 40.87
  },
  {
    time: 1549429200,
    humidity: 0.87,
    temperatureHigh: 54.97,
    temperatureLow: 42.04
  },
  {
    time: 1549515600,
    humidity: 0.91,
    temperatureHigh: 53.81,
    temperatureLow: 44.27
  },
  {
    time: 1549602000,
    humidity: 0.69,
    temperatureHigh: 54.54,
    temperatureLow: 24.62
  },
  {
    time: 1549688400,
    humidity: 0.47,
    temperatureHigh: 34.69,
    temperatureLow: 17.9
  },
  {
    time: 1549774800,
    humidity: 0.62,
    temperatureHigh: 38.88,
    temperatureLow: 30.97
  },
  {
    time: 1549861200,
    humidity: 0.96,
    temperatureHigh: 34.22,
    temperatureLow: 31.36
  },
  {
    time: 1549947600,
    humidity: 0.98,
    temperatureHigh: 36.72,
    temperatureLow: 33.73
  },
  {
    time: 1550034000,
    humidity: 0.69,
    temperatureHigh: 45.85,
    temperatureLow: 28.57
  },
  {
    time: 1550120400,
    humidity: 0.58,
    temperatureHigh: 51.56,
    temperatureLow: 41.13
  },
  {
    time: 1550206800,
    humidity: 0.53,
    temperatureHigh: 66.53,
    temperatureLow: 34.51
  },
  {
    time: 1550293200,
    humidity: 0.47,
    temperatureHigh: 44.57,
    temperatureLow: 25.81
  },
  {
    time: 1550379600,
    humidity: 0.72,
    temperatureHigh: 38.68,
    temperatureLow: 33.26
  },
  {
    time: 1550466000,
    humidity: 0.75,
    temperatureHigh: 45.12,
    temperatureLow: 25.55
  },
  {
    time: 1550552400,
    humidity: 0.47,
    temperatureHigh: 40.07,
    temperatureLow: 29
  },
  {
    time: 1550638800,
    humidity: 0.84,
    temperatureHigh: 32.53,
    temperatureLow: 29.89
  },
  {
    time: 1550725200,
    humidity: 0.82,
    temperatureHigh: 50.85,
    temperatureLow: 40.12
  },
  {
    time: 1550811600,
    humidity: 0.66,
    temperatureHigh: 47.07,
    temperatureLow: 33.66
  },
  {
    time: 1550898000,
    humidity: 0.83,
    temperatureHigh: 39.35,
    temperatureLow: 35.1
  },
  {
    time: 1550984400,
    humidity: 0.82,
    temperatureHigh: 56.21,
    temperatureLow: 35.07
  },
  {
    time: 1551070800,
    humidity: 0.27,
    temperatureHigh: 47.07,
    temperatureLow: 29.18
  },
  {
    time: 1551157200,
    humidity: 0.39,
    temperatureHigh: 51.65,
    temperatureLow: 27.25
  },
  {
    time: 1551243600,
    humidity: 0.69,
    temperatureHigh: 38.46,
    temperatureLow: 33.47
  },
  {
    time: 1551330000,
    humidity: 0.63,
    temperatureHigh: 45.83,
    temperatureLow: 30.83
  },
  {
    time: 1551416400,
    humidity: 0.91,
    temperatureHigh: 35.01,
    temperatureLow: 32.21
  },
  {
    time: 1551502800,
    humidity: 0.89,
    temperatureHigh: 44.05,
    temperatureLow: 35.95
  },
  {
    time: 1551589200,
    humidity: 0.83,
    temperatureHigh: 39.4,
    temperatureLow: 31.68
  },
  {
    time: 1551675600,
    humidity: 0.74,
    temperatureHigh: 36.96,
    temperatureLow: 20.76
  },
  {
    time: 1551762000,
    humidity: 0.54,
    temperatureHigh: 38.6,
    temperatureLow: 17.24
  },
  {
    time: 1551848400,
    humidity: 0.46,
    temperatureHigh: 29.72,
    temperatureLow: 17.56
  },
  {
    time: 1551934800,
    humidity: 0.54,
    temperatureHigh: 40.43,
    temperatureLow: 25.84
  },
  {
    time: 1552021200,
    humidity: 0.78,
    temperatureHigh: 38.61,
    temperatureLow: 31.8
  },
  {
    time: 1552107600,
    humidity: 0.87,
    temperatureHigh: 41.19,
    temperatureLow: 36.01
  },
  {
    time: 1552194000,
    humidity: 0.88,
    temperatureHigh: 57.59,
    temperatureLow: 42.81
  },
  {
    time: 1552276800,
    humidity: 0.47,
    temperatureHigh: 60.7,
    temperatureLow: 33.51
  },
  {
    time: 1552363200,
    humidity: 0.45,
    temperatureHigh: 50.39,
    temperatureLow: 27.4
  },
  {
    time: 1552449600,
    humidity: 0.55,
    temperatureHigh: 58.87,
    temperatureLow: 39.6
  },
  {
    time: 1552536000,
    humidity: 0.66,
    temperatureHigh: 73.72,
    temperatureLow: 60.09
  },
  {
    time: 1552622400,
    humidity: 0.72,
    temperatureHigh: 74.55,
    temperatureLow: 41.45
  },
  {
    time: 1552708800,
    humidity: 0.44,
    temperatureHigh: 53.25,
    temperatureLow: 31.43
  },
  {
    time: 1552795200,
    humidity: 0.46,
    temperatureHigh: 50.44,
    temperatureLow: 33.7
  },
  {
    time: 1552881600,
    humidity: 0.56,
    temperatureHigh: 48.66,
    temperatureLow: 28.98
  },
  {
    time: 1552968000,
    humidity: 0.45,
    temperatureHigh: 51.2,
    temperatureLow: 30.25
  },
  {
    time: 1553054400,
    humidity: 0.51,
    temperatureHigh: 55.26,
    temperatureLow: 41.16
  },
  {
    time: 1553140800,
    humidity: 0.93,
    temperatureHigh: 46.98,
    temperatureLow: 41.16
  },
  {
    time: 1553227200,
    humidity: 0.71,
    temperatureHigh: 49.52,
    temperatureLow: 31.17
  },
  {
    time: 1553313600,
    humidity: 0.47,
    temperatureHigh: 52.38,
    temperatureLow: 30.03
  },
  {
    time: 1553400000,
    humidity: 0.41,
    temperatureHigh: 66.23,
    temperatureLow: 43.68
  },
  {
    time: 1553486400,
    humidity: 0.63,
    temperatureHigh: 63.3,
    temperatureLow: 34.1
  },
  {
    time: 1553572800,
    humidity: 0.45,
    temperatureHigh: 50.92,
    temperatureLow: 28.27
  },
  {
    time: 1553659200,
    humidity: 0.38,
    temperatureHigh: 54.93,
    temperatureLow: 30.8
  },
  {
    time: 1553745600,
    humidity: 0.6,
    temperatureHigh: 63.43,
    temperatureLow: 44.87
  },
  {
    time: 1553832000,
    humidity: 0.61,
    temperatureHigh: 69.67,
    temperatureLow: 46.83
  },
  {
    time: 1553918400,
    humidity: 0.6,
    temperatureHigh: 76.93,
    temperatureLow: 58.11
  },
  {
    time: 1554004800,
    humidity: 0.58,
    temperatureHigh: 59.66,
    temperatureLow: 29.99
  },
  {
    time: 1554091200,
    humidity: 0.41,
    temperatureHigh: 48.99,
    temperatureLow: 31.82
  },
  {
    time: 1554177600,
    humidity: 0.63,
    temperatureHigh: 51.52,
    temperatureLow: 32.21
  },
  {
    time: 1554264000,
    humidity: 0.53,
    temperatureHigh: 69.86,
    temperatureLow: 39.97
  },
  {
    time: 1554350400,
    humidity: 0.38,
    temperatureHigh: 68.55,
    temperatureLow: 45.3
  },
  {
    time: 1554436800,
    humidity: 0.71,
    temperatureHigh: 53.84,
    temperatureLow: 42.26
  },
  {
    time: 1554523200,
    humidity: 0.74,
    temperatureHigh: 69.61,
    temperatureLow: 47.07
  },
  {
    time: 1554609600,
    humidity: 0.74,
    temperatureHigh: 71.82,
    temperatureLow: 57.83
  },
  {
    time: 1554696000,
    humidity: 0.73,
    temperatureHigh: 80.83,
    temperatureLow: 58.12
  },
  {
    time: 1554782400,
    humidity: 0.63,
    temperatureHigh: 79.16,
    temperatureLow: 47.47
  },
  {
    time: 1554868800,
    humidity: 0.38,
    temperatureHigh: 69.73,
    temperatureLow: 44.43
  },
  {
    time: 1554955200,
    humidity: 0.57,
    temperatureHigh: 62.85,
    temperatureLow: 46.56
  },
  {
    time: 1555041600,
    humidity: 0.86,
    temperatureHigh: 70.96,
    temperatureLow: 59.42
  },
  {
    time: 1555128000,
    humidity: 0.77,
    temperatureHigh: 78.99,
    temperatureLow: 58.86
  },
  {
    time: 1555214400,
    humidity: 0.88,
    temperatureHigh: 77.66,
    temperatureLow: 57.72
  },
  {
    time: 1555300800,
    humidity: 0.63,
    temperatureHigh: 59.27,
    temperatureLow: 41.49
  },
  {
    time: 1555387200,
    humidity: 0.5,
    temperatureHigh: 68.33,
    temperatureLow: 50.64
  },
  {
    time: 1555473600,
    humidity: 0.58,
    temperatureHigh: 70.84,
    temperatureLow: 51.91
  },
  {
    time: 1555560000,
    humidity: 0.7,
    temperatureHigh: 81.59,
    temperatureLow: 63.57
  },
  {
    time: 1555646400,
    humidity: 0.81,
    temperatureHigh: 77.61,
    temperatureLow: 63.03
  },
  {
    time: 1555732800,
    humidity: 0.68,
    temperatureHigh: 72.13,
    temperatureLow: 49.28
  },
  {
    time: 1555819200,
    humidity: 0.6,
    temperatureHigh: 69.22,
    temperatureLow: 50.61
  },
  {
    time: 1555905600,
    humidity: 0.63,
    temperatureHigh: 71.88,
    temperatureLow: 52.07
  },
  {
    time: 1555992000,
    humidity: 0.55,
    temperatureHigh: 83.48,
    temperatureLow: 60.2
  },
  {
    time: 1556078400,
    humidity: 0.52,
    temperatureHigh: 77.12,
    temperatureLow: 55.3
  },
  {
    time: 1556164800,
    humidity: 0.52,
    temperatureHigh: 77.18,
    temperatureLow: 56.24
  },
  {
    time: 1556251200,
    humidity: 0.79,
    temperatureHigh: 73.52,
    temperatureLow: 49.27
  },
  {
    time: 1556337600,
    humidity: 0.4,
    temperatureHigh: 70.15,
    temperatureLow: 52.15
  },
  {
    time: 1556424000,
    humidity: 0.7,
    temperatureHigh: 71.09,
    temperatureLow: 41.22
  },
  {
    time: 1556510400,
    humidity: 0.62,
    temperatureHigh: 65.33,
    temperatureLow: 53.61
  },
  {
    time: 1556596800,
    humidity: 0.73,
    temperatureHigh: 81.71,
    temperatureLow: 55.32
  },
  {
    time: 1556683200,
    humidity: 0.82,
    temperatureHigh: 69.35,
    temperatureLow: 59.14
  },
  {
    time: 1556769600,
    humidity: 0.8,
    temperatureHigh: 85.94,
    temperatureLow: 61.56
  },
  {
    time: 1556856000,
    humidity: 0.87,
    temperatureHigh: 77.64,
    temperatureLow: 61.09
  },
  {
    time: 1556942400,
    humidity: 0.86,
    temperatureHigh: 78.95,
    temperatureLow: 62.62
  },
  {
    time: 1557028800,
    humidity: 0.95,
    temperatureHigh: 64.54,
    temperatureLow: 55.2
  },
  {
    time: 1557115200,
    humidity: 0.77,
    temperatureHigh: 76.06,
    temperatureLow: 56.84
  },
  {
    time: 1557201600,
    humidity: 0.72,
    temperatureHigh: 81.13,
    temperatureLow: 59.8
  },
  {
    time: 1557288000,
    humidity: 0.86,
    temperatureHigh: 70.08,
    temperatureLow: 58.03
  },
  {
    time: 1557374400,
    humidity: 0.83,
    temperatureHigh: 77.21,
    temperatureLow: 63.98
  },
  {
    time: 1557460800,
    humidity: 0.8,
    temperatureHigh: 81.47,
    temperatureLow: 58.53
  },
  {
    time: 1557547200,
    humidity: 0.82,
    temperatureHigh: 66.91,
    temperatureLow: 52.06
  },
  {
    time: 1557633600,
    humidity: 0.94,
    temperatureHigh: 54.91,
    temperatureLow: 47.01
  },
  {
    time: 1557720000,
    humidity: 0.91,
    temperatureHigh: 56.44,
    temperatureLow: 47.34
  },
  {
    time: 1557806400,
    humidity: 0.74,
    temperatureHigh: 60.11,
    temperatureLow: 45.6
  },
  {
    time: 1557892800,
    humidity: 0.59,
    temperatureHigh: 73.75,
    temperatureLow: 52.87
  },
  {
    time: 1557979200,
    humidity: 0.61,
    temperatureHigh: 77.33,
    temperatureLow: 54.98
  },
  {
    time: 1558065600,
    humidity: 0.72,
    temperatureHigh: 81.52,
    temperatureLow: 63.5
  },
  {
    time: 1558152000,
    humidity: 0.76,
    temperatureHigh: 83.26,
    temperatureLow: 64.12
  },
  {
    time: 1558238400,
    humidity: 0.74,
    temperatureHigh: 89.31,
    temperatureLow: 71.06
  },
  {
    time: 1558324800,
    humidity: 0.62,
    temperatureHigh: 86.2,
    temperatureLow: 58.56
  },
  {
    time: 1558411200,
    humidity: 0.55,
    temperatureHigh: 72.81,
    temperatureLow: 51.39
  },
  {
    time: 1558497600,
    humidity: 0.55,
    temperatureHigh: 74.94,
    temperatureLow: 58.96
  },
  {
    time: 1558584000,
    humidity: 0.72,
    temperatureHigh: 87.25,
    temperatureLow: 68.33
  },
  {
    time: 1558670400,
    humidity: 0.6,
    temperatureHigh: 82.79,
    temperatureLow: 62.13
  },
  {
    time: 1558756800,
    humidity: 0.69,
    temperatureHigh: 83.41,
    temperatureLow: 65.72
  },
  {
    time: 1558843200,
    humidity: 0.74,
    temperatureHigh: 89.22,
    temperatureLow: 67.13
  },
  {
    time: 1558929600,
    humidity: 0.71,
    temperatureHigh: 82.8,
    temperatureLow: 66.22
  },
  {
    time: 1559016000,
    humidity: 0.77,
    temperatureHigh: 89.69,
    temperatureLow: 70.06
  },
  {
    time: 1559102400,
    humidity: 0.64,
    temperatureHigh: 91.58,
    temperatureLow: 70.38
  },
  {
    time: 1559188800,
    humidity: 0.7,
    temperatureHigh: 87.83,
    temperatureLow: 65.22
  },
  {
    time: 1559275200,
    humidity: 0.63,
    temperatureHigh: 85.11,
    temperatureLow: 64.27
  },
  {
    time: 1559361600,
    humidity: 0.6,
    temperatureHigh: 86.17,
    temperatureLow: 64.27
  },
  {
    time: 1559448000,
    humidity: 0.69,
    temperatureHigh: 84.93,
    temperatureLow: 55.38
  },
  {
    time: 1559534400,
    humidity: 0.52,
    temperatureHigh: 73.39,
    temperatureLow: 49.69
  },
  {
    time: 1559620800,
    humidity: 0.51,
    temperatureHigh: 76.74,
    temperatureLow: 60.72
  },
  {
    time: 1559707200,
    humidity: 0.69,
    temperatureHigh: 84.59,
    temperatureLow: 68.82
  },
  {
    time: 1559793600,
    humidity: 0.71,
    temperatureHigh: 87.12,
    temperatureLow: 69.69
  },
  {
    time: 1559880000,
    humidity: 0.69,
    temperatureHigh: 81.87,
    temperatureLow: 64.46
  },
  {
    time: 1559966400,
    humidity: 0.66,
    temperatureHigh: 82.02,
    temperatureLow: 63.9
  },
  {
    time: 1560052800,
    humidity: 0.79,
    temperatureHigh: 76.15,
    temperatureLow: 61.72
  },
  {
    time: 1560139200,
    humidity: 0.91,
    temperatureHigh: 77.81,
    temperatureLow: 61.57
  },
  {
    time: 1560225600,
    humidity: 0.6,
    temperatureHigh: 79.05,
    temperatureLow: 59.33
  },
  {
    time: 1560312000,
    humidity: 0.58,
    temperatureHigh: 77.3,
    temperatureLow: 62.13
  },
  {
    time: 1560398400,
    humidity: 0.86,
    temperatureHigh: 76.14,
    temperatureLow: 56.78
  },
  {
    time: 1560484800,
    humidity: 0.57,
    temperatureHigh: 76.31,
    temperatureLow: 56.29
  },
  {
    time: 1560571200,
    humidity: 0.56,
    temperatureHigh: 85.35,
    temperatureLow: 65.96
  },
  {
    time: 1560657600,
    humidity: 0.67,
    temperatureHigh: 87.18,
    temperatureLow: 69.3
  },
  {
    time: 1560744000,
    humidity: 0.74,
    temperatureHigh: 88.46,
    temperatureLow: 69.16
  },
  {
    time: 1560830400,
    humidity: 0.81,
    temperatureHigh: 86.84,
    temperatureLow: 70.07
  },
  {
    time: 1560916800,
    humidity: 0.83,
    temperatureHigh: 86.67,
    temperatureLow: 72.02
  },
  {
    time: 1561003200,
    humidity: 0.78,
    temperatureHigh: 88.29,
    temperatureLow: 69.17
  },
  {
    time: 1561089600,
    humidity: 0.64,
    temperatureHigh: 82.18,
    temperatureLow: 60.93
  },
  {
    time: 1561176000,
    humidity: 0.52,
    temperatureHigh: 81.58,
    temperatureLow: 58.56
  },
  {
    time: 1561262400,
    humidity: 0.56,
    temperatureHigh: 85.26,
    temperatureLow: 64.43
  },
  {
    time: 1561348800,
    humidity: 0.71,
    temperatureHigh: 90.4,
    temperatureLow: 71.91
  },
  {
    time: 1561435200,
    humidity: 0.71,
    temperatureHigh: 87.61,
    temperatureLow: 67.13
  },
  {
    time: 1561521600,
    humidity: 0.6,
    temperatureHigh: 91.06,
    temperatureLow: 70.52
  },
  {
    time: 1561608000,
    humidity: 0.62,
    temperatureHigh: 93.47,
    temperatureLow: 69.46
  },
  {
    time: 1561694400,
    humidity: 0.68,
    temperatureHigh: 93.74,
    temperatureLow: 70.3
  },
  {
    time: 1561780800,
    humidity: 0.67,
    temperatureHigh: 94.06,
    temperatureLow: 71.97
  },
  {
    time: 1561867200,
    humidity: 0.59,
    temperatureHigh: 90.53,
    temperatureLow: 63.98
  },
  {
    time: 1561953600,
    humidity: 0.57,
    temperatureHigh: 86.38,
    temperatureLow: 65.37
  },
  {
    time: 1562040000,
    humidity: 0.68,
    temperatureHigh: 94.03,
    temperatureLow: 72.15
  },
  {
    time: 1562126400,
    humidity: 0.71,
    temperatureHigh: 91.92,
    temperatureLow: 74.05
  },
  {
    time: 1562212800,
    humidity: 0.83,
    temperatureHigh: 88.24,
    temperatureLow: 73.29
  },
  {
    time: 1562299200,
    humidity: 0.8,
    temperatureHigh: 90.59,
    temperatureLow: 74.22
  },
  {
    time: 1562385600,
    humidity: 0.78,
    temperatureHigh: 92.29,
    temperatureLow: 72.22
  },
  {
    time: 1562472000,
    humidity: 0.81,
    temperatureHigh: 88.08,
    temperatureLow: 72.64
  },
  {
    time: 1562558400,
    humidity: 0.9,
    temperatureHigh: 78.38,
    temperatureLow: 63.93
  },
  {
    time: 1562644800,
    humidity: 0.74,
    temperatureHigh: 87.21,
    temperatureLow: 69.02
  },
  {
    time: 1562731200,
    humidity: 0.7,
    temperatureHigh: 88.27,
    temperatureLow: 72.43
  },
  {
    time: 1562817600,
    humidity: 0.81,
    temperatureHigh: 89.15,
    temperatureLow: 69.94
  },
  {
    time: 1562904000,
    humidity: 0.74,
    temperatureHigh: 88.31,
    temperatureLow: 67.67
  },
  {
    time: 1562990400,
    humidity: 0.64,
    temperatureHigh: 91.7,
    temperatureLow: 71.05
  },
  {
    time: 1563076800,
    humidity: 0.63,
    temperatureHigh: 93.47,
    temperatureLow: 66.65
  },
  {
    time: 1563163200,
    humidity: 0.58,
    temperatureHigh: 90.7,
    temperatureLow: 71.25
  },
  {
    time: 1563249600,
    humidity: 0.67,
    temperatureHigh: 94.26,
    temperatureLow: 76.16
  },
  {
    time: 1563336000,
    humidity: 0.7,
    temperatureHigh: 96.43,
    temperatureLow: 75.38
  },
  {
    time: 1563422400,
    humidity: 0.76,
    temperatureHigh: 91.14,
    temperatureLow: 74.94
  },
  {
    time: 1563508800,
    humidity: 0.69,
    temperatureHigh: 96.17,
    temperatureLow: 78.08
  },
  {
    time: 1563595200,
    humidity: 0.65,
    temperatureHigh: 97.06,
    temperatureLow: 79.52
  },
  {
    time: 1563681600,
    humidity: 0.65,
    temperatureHigh: 98.52,
    temperatureLow: 74.55
  },
  {
    time: 1563768000,
    humidity: 0.73,
    temperatureHigh: 91.64,
    temperatureLow: 66.76
  },
  {
    time: 1563854400,
    humidity: 0.82,
    temperatureHigh: 78.45,
    temperatureLow: 63.37
  },
  {
    time: 1563940800,
    humidity: 0.71,
    temperatureHigh: 82.43,
    temperatureLow: 61.25
  },
  {
    time: 1564027200,
    humidity: 0.65,
    temperatureHigh: 86.14,
    temperatureLow: 64.27
  },
  {
    time: 1564113600,
    humidity: 0.6,
    temperatureHigh: 88.03,
    temperatureLow: 65.39
  },
  {
    time: 1564200000,
    humidity: 0.6,
    temperatureHigh: 91.45,
    temperatureLow: 69.94
  },
  {
    time: 1564286400,
    humidity: 0.59,
    temperatureHigh: 92.82,
    temperatureLow: 71.03
  },
  {
    time: 1564372800,
    humidity: 0.63,
    temperatureHigh: 93.06,
    temperatureLow: 72.5
  },
  {
    time: 1564459200,
    humidity: 0.61,
    temperatureHigh: 94.86,
    temperatureLow: 71.32
  },
  {
    time: 1564545600,
    humidity: 0.71,
    temperatureHigh: 88.91,
    temperatureLow: 67.59
  },
  {
    time: 1564632000,
    humidity: 0.72,
    temperatureHigh: 88.56,
    temperatureLow: 71.63
  },
  {
    time: 1564718400,
    humidity: 0.71,
    temperatureHigh: 87.03,
    temperatureLow: 69.38
  },
  {
    time: 1564804800,
    humidity: 0.75,
    temperatureHigh: 88.48,
    temperatureLow: 70.4
  },
  {
    time: 1564891200,
    humidity: 0.68,
    temperatureHigh: 89.52,
    temperatureLow: 68.5
  },
  {
    time: 1564977600,
    humidity: 0.7,
    temperatureHigh: 86.61,
    temperatureLow: 68.54
  },
  {
    time: 1565064000,
    humidity: 0.69,
    temperatureHigh: 91.16,
    temperatureLow: 71.84
  },
  {
    time: 1565150400,
    humidity: 0.77,
    temperatureHigh: 89.77,
    temperatureLow: 67.49
  },
  {
    time: 1565236800,
    humidity: 0.68,
    temperatureHigh: 90.03,
    temperatureLow: 70.48
  },
  {
    time: 1565323200,
    humidity: 0.59,
    temperatureHigh: 88.98,
    temperatureLow: 62.86
  },
  {
    time: 1565409600,
    humidity: 0.55,
    temperatureHigh: 83.35,
    temperatureLow: 62.48
  },
  {
    time: 1565496000,
    humidity: 0.57,
    temperatureHigh: 85.53,
    temperatureLow: 62.69
  },
  {
    time: 1565582400,
    humidity: 0.63,
    temperatureHigh: 90.79,
    temperatureLow: 74.19
  },
  {
    time: 1565668800,
    humidity: 0.74,
    temperatureHigh: 86.64,
    temperatureLow: 71.81
  },
  {
    time: 1565755200,
    humidity: 0.82,
    temperatureHigh: 86.65,
    temperatureLow: 70.7
  },
  {
    time: 1565841600,
    humidity: 0.84,
    temperatureHigh: 85.27,
    temperatureLow: 71.4
  },
  {
    time: 1565928000,
    humidity: 0.82,
    temperatureHigh: 87.44,
    temperatureLow: 72.19
  },
  {
    time: 1566014400,
    humidity: 0.78,
    temperatureHigh: 90.99,
    temperatureLow: 72.38
  },
  {
    time: 1566100800,
    humidity: 0.73,
    temperatureHigh: 93.34,
    temperatureLow: 72.1
  },
  {
    time: 1566187200,
    humidity: 0.7,
    temperatureHigh: 95.16,
    temperatureLow: 72.91
  },
  {
    time: 1566273600,
    humidity: 0.73,
    temperatureHigh: 92.68,
    temperatureLow: 70.12
  },
  {
    time: 1566360000,
    humidity: 0.78,
    temperatureHigh: 90.75,
    temperatureLow: 71.12
  },
  {
    time: 1566446400,
    humidity: 0.73,
    temperatureHigh: 91.72,
    temperatureLow: 70.96
  },
  {
    time: 1566532800,
    humidity: 0.88,
    temperatureHigh: 72.34,
    temperatureLow: 58.45
  },
  {
    time: 1566619200,
    humidity: 0.68,
    temperatureHigh: 78.38,
    temperatureLow: 59.96
  },
  {
    time: 1566705600,
    humidity: 0.68,
    temperatureHigh: 78.41,
    temperatureLow: 59.69
  },
  {
    time: 1566792000,
    humidity: 0.75,
    temperatureHigh: 79.24,
    temperatureLow: 62.6
  },
  {
    time: 1566878400,
    humidity: 0.8,
    temperatureHigh: 78.51,
    temperatureLow: 65.46
  },
  {
    time: 1566964800,
    humidity: 0.87,
    temperatureHigh: 80.43,
    temperatureLow: 60.72
  },
  {
    time: 1567051200,
    humidity: 0.67,
    temperatureHigh: 82.56,
    temperatureLow: 58.4
  },
  {
    time: 1567137600,
    humidity: 0.63,
    temperatureHigh: 89.28,
    temperatureLow: 65.31
  },
  {
    time: 1567224000,
    humidity: 0.67,
    temperatureHigh: 87.38,
    temperatureLow: 67.9
  },
  {
    time: 1567310400,
    humidity: 0.75,
    temperatureHigh: 83.8,
    temperatureLow: 68.76
  },
  {
    time: 1567396800,
    humidity: 0.81,
    temperatureHigh: 87.19,
    temperatureLow: 65.09
  },
  {
    time: 1567483200,
    humidity: 0.72,
    temperatureHigh: 87.07,
    temperatureLow: 68.8
  },
  {
    time: 1567569600,
    humidity: 0.73,
    temperatureHigh: 91.91,
    temperatureLow: 68.68
  },
  {
    time: 1567656000,
    humidity: 0.69,
    temperatureHigh: 81.2,
    temperatureLow: 65.68
  },
  {
    time: 1567742400,
    humidity: 0.75,
    temperatureHigh: 75.72,
    temperatureLow: 57.48
  },
  {
    time: 1567828800,
    humidity: 0.7,
    temperatureHigh: 81.81,
    temperatureLow: 58.91
  },
  {
    time: 1567915200,
    humidity: 0.66,
    temperatureHigh: 83.44,
    temperatureLow: 63.59
  },
  {
    time: 1568001600,
    humidity: 0.67,
    temperatureHigh: 84.25,
    temperatureLow: 64.07
  },
  {
    time: 1568088000,
    humidity: 0.71,
    temperatureHigh: 86.54,
    temperatureLow: 67.11
  },
  {
    time: 1568174400,
    humidity: 0.76,
    temperatureHigh: 94.27,
    temperatureLow: 70.36
  },
  {
    time: 1568260800,
    humidity: 0.71,
    temperatureHigh: 92.93,
    temperatureLow: 65.2
  },
  {
    time: 1568347200,
    humidity: 0.8,
    temperatureHigh: 72.48,
    temperatureLow: 63.94
  },
  {
    time: 1568433600,
    humidity: 0.78,
    temperatureHigh: 79.82,
    temperatureLow: 68.93
  },
  {
    time: 1568520000,
    humidity: 0.65,
    temperatureHigh: 87.23,
    temperatureLow: 62.46
  },
  {
    time: 1568606400,
    humidity: 0.64,
    temperatureHigh: 90.35,
    temperatureLow: 67.84
  },
  {
    time: 1568692800,
    humidity: 0.7,
    temperatureHigh: 80.6,
    temperatureLow: 55.93
  },
  {
    time: 1568779200,
    humidity: 0.66,
    temperatureHigh: 78.34,
    temperatureLow: 53.08
  },
  {
    time: 1568865600,
    humidity: 0.61,
    temperatureHigh: 75.96,
    temperatureLow: 49.7
  },
  {
    time: 1568952000,
    humidity: 0.64,
    temperatureHigh: 80.8,
    temperatureLow: 56.18
  },
  {
    time: 1569038400,
    humidity: 0.65,
    temperatureHigh: 88.62,
    temperatureLow: 65.82
  },
  {
    time: 1569124800,
    humidity: 0.69,
    temperatureHigh: 90.92,
    temperatureLow: 69.86
  },
  {
    time: 1569211200,
    humidity: 0.61,
    temperatureHigh: 91.2,
    temperatureLow: 64.59
  },
  {
    time: 1569297600,
    humidity: 0.61,
    temperatureHigh: 79.72,
    temperatureLow: 55.17
  },
  {
    time: 1569384000,
    humidity: 0.58,
    temperatureHigh: 82.56,
    temperatureLow: 60.91
  },
  {
    time: 1569470400,
    humidity: 0.67,
    temperatureHigh: 85.78,
    temperatureLow: 57.36
  },
  {
    time: 1569556800,
    humidity: 0.65,
    temperatureHigh: 82.05,
    temperatureLow: 63.59
  },
  {
    time: 1569643200,
    humidity: 0.78,
    temperatureHigh: 86.84,
    temperatureLow: 68.63
  },
  {
    time: 1569729600,
    humidity: 0.73,
    temperatureHigh: 85.16,
    temperatureLow: 68.37
  },
  {
    time: 1569816000,
    humidity: 0.82,
    temperatureHigh: 73.51,
    temperatureLow: 65.62
  },
  {
    time: 1569902400,
    humidity: 0.76,
    temperatureHigh: 85.82,
    temperatureLow: 69.55
  },
  {
    time: 1569988800,
    humidity: 0.67,
    temperatureHigh: 93.29,
    temperatureLow: 72.94
  },
  {
    time: 1570075200,
    humidity: 0.81,
    temperatureHigh: 77.04,
    temperatureLow: 65.02
  },
  {
    time: 1570161600,
    humidity: 0.66,
    temperatureHigh: 73.41,
    temperatureLow: 45.15
  },
  {
    time: 1570248000,
    humidity: 0.66,
    temperatureHigh: 67.23,
    temperatureLow: 57.99
  },
  {
    time: 1570334400,
    humidity: 0.79,
    temperatureHigh: 74.52,
    temperatureLow: 66.59
  },
  {
    time: 1570420800,
    humidity: 0.75,
    temperatureHigh: 80.01,
    temperatureLow: 56.8
  },
  {
    time: 1570507200,
    humidity: 0.72,
    temperatureHigh: 68.68,
    temperatureLow: 54.25
  },
  {
    time: 1570593600,
    humidity: 0.69,
    temperatureHigh: 70.73,
    temperatureLow: 51.43
  },
  {
    time: 1570680000,
    humidity: 0.68,
    temperatureHigh: 75.9,
    temperatureLow: 49.48
  },
  {
    time: 1570766400,
    humidity: 0.56,
    temperatureHigh: 75.01,
    temperatureLow: 49.13
  },
  {
    time: 1570852800,
    humidity: 0.73,
    temperatureHigh: 73.25,
    temperatureLow: 49.51
  },
  {
    time: 1570939200,
    humidity: 0.63,
    temperatureHigh: 66.47,
    temperatureLow: 46.18
  },
  {
    time: 1571025600,
    humidity: 0.66,
    temperatureHigh: 75.34,
    temperatureLow: 45.56
  },
  {
    time: 1571112000,
    humidity: 0.59,
    temperatureHigh: 72.6,
    temperatureLow: 54.41
  },
  {
    time: 1571198400,
    humidity: 0.89,
    temperatureHigh: 61.59,
    temperatureLow: 48.18
  },
  {
    time: 1571284800,
    humidity: 0.61,
    temperatureHigh: 57.69,
    temperatureLow: 43.25
  },
  {
    time: 1571371200,
    humidity: 0.6,
    temperatureHigh: 63.53,
    temperatureLow: 38.18
  },
  {
    time: 1571457600,
    humidity: 0.69,
    temperatureHigh: 65,
    temperatureLow: 51.16
  },
  {
    time: 1571544000,
    humidity: 0.92,
    temperatureHigh: 55.8,
    temperatureLow: 51.01
  },
  {
    time: 1571630400,
    humidity: 0.82,
    temperatureHigh: 67.78,
    temperatureLow: 55.98
  },
  {
    time: 1571716800,
    humidity: 0.93,
    temperatureHigh: 63.26,
    temperatureLow: 47.9
  },
  {
    time: 1571803200,
    humidity: 0.7,
    temperatureHigh: 66,
    temperatureLow: 40.4
  },
  {
    time: 1571889600,
    humidity: 0.64,
    temperatureHigh: 70.33,
    temperatureLow: 46.73
  },
  {
    time: 1571976000,
    humidity: 0.77,
    temperatureHigh: 69.53,
    temperatureLow: 53.15
  },
  {
    time: 1572062400,
    humidity: 0.75,
    temperatureHigh: 65.71,
    temperatureLow: 58.29
  },
  {
    time: 1572148800,
    humidity: 0.82,
    temperatureHigh: 77.9,
    temperatureLow: 49.09
  },
  {
    time: 1572235200,
    humidity: 0.75,
    temperatureHigh: 68.01,
    temperatureLow: 53.64
  },
  {
    time: 1572321600,
    humidity: 0.83,
    temperatureHigh: 66.49,
    temperatureLow: 55.04
  },
  {
    time: 1572408000,
    humidity: 0.87,
    temperatureHigh: 67.12,
    temperatureLow: 58.96
  },
  {
    time: 1572494400,
    humidity: 0.94,
    temperatureHigh: 76.25,
    temperatureLow: 40.24
  },
  {
    time: 1572580800,
    humidity: 0.61,
    temperatureHigh: 53.1,
    temperatureLow: 32.63
  },
  {
    time: 1572667200,
    humidity: 0.69,
    temperatureHigh: 54.26,
    temperatureLow: 35.82
  },
  {
    time: 1572753600,
    humidity: 0.62,
    temperatureHigh: 54.22,
    temperatureLow: 33.38
  },
  {
    time: 1572843600,
    humidity: 0.66,
    temperatureHigh: 60.99,
    temperatureLow: 38.39
  },
  {
    time: 1572930000,
    humidity: 0.7,
    temperatureHigh: 65.66,
    temperatureLow: 36.9
  },
  {
    time: 1573016400,
    humidity: 0.62,
    temperatureHigh: 58.69,
    temperatureLow: 43.05
  },
  {
    time: 1573102800,
    humidity: 0.78,
    temperatureHigh: 60.46,
    temperatureLow: 33.7
  },
  {
    time: 1573189200,
    humidity: 0.59,
    temperatureHigh: 42.53,
    temperatureLow: 26.14
  },
  {
    time: 1573275600,
    humidity: 0.65,
    temperatureHigh: 45.45,
    temperatureLow: 32.86
  },
  {
    time: 1573362000,
    humidity: 0.66,
    temperatureHigh: 58.88,
    temperatureLow: 36.87
  },
  {
    time: 1573448400,
    humidity: 0.7,
    temperatureHigh: 67.47,
    temperatureLow: 43.37
  },
  {
    time: 1573534800,
    humidity: 0.63,
    temperatureHigh: 47.04,
    temperatureLow: 21.96
  },
  {
    time: 1573621200,
    humidity: 0.5,
    temperatureHigh: 38.49,
    temperatureLow: 22.84
  },
  {
    time: 1573707600,
    humidity: 0.63,
    temperatureHigh: 44.33,
    temperatureLow: 27.88
  },
  {
    time: 1573794000,
    humidity: 0.63,
    temperatureHigh: 54.49,
    temperatureLow: 32.02
  },
  {
    time: 1573880400,
    humidity: 0.53,
    temperatureHigh: 45.57,
    temperatureLow: 31.13
  },
  {
    time: 1573966800,
    humidity: 0.59,
    temperatureHigh: 44.66,
    temperatureLow: 36.92
  },
  {
    time: 1574053200,
    humidity: 0.86,
    temperatureHigh: 46.58,
    temperatureLow: 38.45
  },
  {
    time: 1574139600,
    humidity: 0.82,
    temperatureHigh: 54.79,
    temperatureLow: 41.41
  },
  {
    time: 1574226000,
    humidity: 0.71,
    temperatureHigh: 51.38,
    temperatureLow: 34.27
  },
  {
    time: 1574312400,
    humidity: 0.66,
    temperatureHigh: 53.48,
    temperatureLow: 44.51
  },
  {
    time: 1574398800,
    humidity: 0.74,
    temperatureHigh: 53.78,
    temperatureLow: 29.78
  },
  {
    time: 1574485200,
    humidity: 0.78,
    temperatureHigh: 45.02,
    temperatureLow: 38.24
  },
  {
    time: 1574571600,
    humidity: 0.77,
    temperatureHigh: 51.33,
    temperatureLow: 34.66
  },
  {
    time: 1574658000,
    humidity: 0.72,
    temperatureHigh: 57.07,
    temperatureLow: 33.33
  },
  {
    time: 1574744400,
    humidity: 0.76,
    temperatureHigh: 62.74,
    temperatureLow: 42.19
  },
  {
    time: 1574830800,
    humidity: 0.83,
    temperatureHigh: 56.95,
    temperatureLow: 40.69
  },
  {
    time: 1574917200,
    humidity: 0.58,
    temperatureHigh: 48.6,
    temperatureLow: 33.88
  },
  {
    time: 1575003600,
    humidity: 0.64,
    temperatureHigh: 50.11,
    temperatureLow: 35.46
  },
  {
    time: 1575090000,
    humidity: 0.62,
    temperatureHigh: 45.36,
    temperatureLow: 36.85
  },
  {
    time: 1575176400,
    humidity: 0.91,
    temperatureHigh: 43.13,
    temperatureLow: 36.1
  },
  {
    time: 1575262800,
    humidity: 0.87,
    temperatureHigh: 42.91,
    temperatureLow: 34.78
  },
  {
    time: 1575349200,
    humidity: 0.71,
    temperatureHigh: 46.97,
    temperatureLow: 33.06
  },
  {
    time: 1575435600,
    humidity: 0.77,
    temperatureHigh: 48.05,
    temperatureLow: 35.04
  },
  {
    time: 1575522000,
    humidity: 0.61,
    temperatureHigh: 46.55,
    temperatureLow: 31.52
  },
  {
    time: 1575608400,
    humidity: 0.67,
    temperatureHigh: 52.74,
    temperatureLow: 30.91
  },
  {
    time: 1575694800,
    humidity: 0.62,
    temperatureHigh: 44.67,
    temperatureLow: 25.17
  },
  {
    time: 1575781200,
    humidity: 0.75,
    temperatureHigh: 47.33,
    temperatureLow: 39.4
  },
  {
    time: 1575867600,
    humidity: 0.96,
    temperatureHigh: 48.04,
    temperatureLow: 47.05
  },
  {
    time: 1575954000,
    humidity: 0.92,
    temperatureHigh: 56.89,
    temperatureLow: 31.29
  },
  {
    time: 1576040400,
    humidity: 0.69,
    temperatureHigh: 39.24,
    temperatureLow: 25.38
  },
  {
    time: 1576126800,
    humidity: 0.63,
    temperatureHigh: 38.17,
    temperatureLow: 29.18
  },
  {
    time: 1576213200,
    humidity: 0.91,
    temperatureHigh: 40.18,
    temperatureLow: 39.19
  },
  {
    time: 1576299600,
    humidity: 0.92,
    temperatureHigh: 46.48,
    temperatureLow: 38.49
  },
  {
    time: 1576386000,
    humidity: 0.69,
    temperatureHigh: 50.13,
    temperatureLow: 32.36
  },
  {
    time: 1576472400,
    humidity: 0.91,
    temperatureHigh: 36.76,
    temperatureLow: 33.72
  },
  {
    time: 1576558800,
    humidity: 0.91,
    temperatureHigh: 40.03,
    temperatureLow: 27.13
  }
];

function generate() {
  return WEATHER.map(element => element.humidity);
}

export default { generate };
