// Global chart instances
let primaryChart, pieChart, barChart, multiLineChart;

// Sample data sets
const dataSets = {
    sales: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        primary: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
        secondary: [28, 48, 40, 19, 86, 27, 90, 60, 45, 55, 70, 75],
        categories: {
            labels: ['Online', 'Retail', 'Wholesale', 'Direct'],
            data: [35, 25, 25, 15]
        }
    },
    users: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        primary: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 6000],
        secondary: [800, 1200, 2000, 3200, 1500, 2200, 3000, 4200],
        categories: {
            labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
            data: [45, 35, 15, 5]
        }
    },
    revenue: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        primary: [250000, 320000, 280000, 450000],
        secondary: [200000, 280000, 240000, 380000],
        categories: {
            labels: ['Product A', 'Product B', 'Product C', 'Services'],
            data: [30, 25, 20, 25]
        }
    },
    products: {
        labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'],
        primary: [85, 72, 45, 63, 38, 55],
        secondary: [65, 58, 35, 48, 28, 42],
        categories: {
            labels: ['Premium', 'Standard', 'Budget', 'Clearance'],
            data: [20, 45, 25, 10]
        }
    }
};

// Chart configurations
const chartConfigs = {
    line: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    },
    bar: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    },
    area: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            fill: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    },
    radar: {
        type: 'radar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    }
};

// Initialize dashboard
function initDashboard() {
    updateCharts();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('dataSet').addEventListener('change', updateCharts);
    document.getElementById('timeRange').addEventListener('change', updateCharts);
    document.getElementById('chartType').addEventListener('change', updatePrimaryChart);
}

// Update all charts
function updateCharts() {
    showLoading();
    setTimeout(() => {
        updatePrimaryChart();
        updatePieChart();
        updateBarChart();
        updateMultiLineChart();
        updateStats();
        hideLoading();
    }, 500);
}

// Update primary chart
function updatePrimaryChart() {
    const dataSet = document.getElementById('dataSet').value;
    const chartType = document.getElementById('chartType').value;
    const data = dataSets[dataSet];

    if (primaryChart) {
        primaryChart.destroy();
    }

    const ctx = document.getElementById('primaryChart').getContext('2d');
    const config = { ...chartConfigs[chartType] };
    
    config.data = {
        labels: data.labels,
        datasets: [{
            label: 'Primary Metric',
            data: data.primary,
            backgroundColor: chartType === 'area' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.8)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            fill: chartType === 'area'
        }]
    };

    primaryChart = new Chart(ctx, config);
}

// Update pie chart
function updatePieChart() {
    const dataSet = document.getElementById('dataSet').value;
    const data = dataSets[dataSet].categories;

    if (pieChart) {
        pieChart.destroy();
    }

    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Update bar chart
function updateBarChart() {
    const dataSet = document.getElementById('dataSet').value;
    const data = dataSets[dataSet];

    if (barChart) {
        barChart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels.slice(0, 6),
            datasets: [{
                label: 'Current Period',
                data: data.primary.slice(0, 6),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }, {
                label: 'Previous Period',
                data: data.secondary.slice(0, 6),
                backgroundColor: 'rgba(118, 75, 162, 0.8)',
                borderColor: 'rgba(118, 75, 162, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Update multi-line chart
function updateMultiLineChart() {
    const dataSet = document.getElementById('dataSet').value;
    const data = dataSets[dataSet];

    if (multiLineChart) {
        multiLineChart.destroy();
    }

    const ctx = document.getElementById('multiLineChart').getContext('2d');
    multiLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Metric A',
                data: data.primary,
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Metric B',
                data: data.secondary,
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                borderColor: 'rgba(118, 75, 162, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Update statistics
function updateStats() {
    const dataSet = document.getElementById('dataSet').value;
    const data = dataSets[dataSet];
    
    const total = data.primary.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / data.primary.length);
    const max = Math.max(...data.primary);
    const growth = Math.round(((data.primary[data.primary.length - 1] - data.primary[0]) / data.primary[0]) * 100);

    // Animate numbers
    animateNumber('totalValue', total);
    animateNumber('avgValue', avg);
    animateNumber('maxValue', max);
    animateNumber('growthRate', growth, '%');
}

// Animate number changes
function animateNumber(elementId, targetValue, suffix = '') {
    const element = document.getElementById(elementId);
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Show loading animation
function showLoading() {
    document.getElementById('loading1').style.display = 'flex';
}

// Hide loading animation
function hideLoading() {
    document.getElementById('loading1').style.display = 'none';
}

// Refresh data
function refreshData() {
    updateCharts();
}

// Randomize data
function randomizeData() {
    // Add some randomization to current data
    const dataSet = document.getElementById('dataSet').value;
    const data = dataSets[dataSet];
    
    data.primary = data.primary.map(val => Math.max(0, val + Math.floor(Math.random() * 40 - 20)));
    data.secondary = data.secondary.map(val => Math.max(0, val + Math.floor(Math.random() * 30 - 15)));
    
    updateCharts();
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', initDashboard);