export type ChartProps = {
  type: 'bar' | 'pie';
  source: string; //legitimate source
  data: {
    labels: string[];
    datasets: {
      label: string; // Explain what the data represents (e.g., 'Number of products')
      data: number[];
    }[];
  };
  options: {
    responsive: true;
    plugins: {
      legend: {
        display: boolean;
        position: 'top' | 'left' | 'bottom' | 'right';
      };
      title: {
        display: true;
        text: string;
      };
    };
    scales?: {
      y: {
        beginAtZero: true; //for bar chart only
        max: number; //for bar chart only, max value of y-axis
      };
    };
  };
};
