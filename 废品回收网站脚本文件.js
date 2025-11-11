// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 页面加载动画
    animateOnScroll();
    
    // 初始化页面元素动画
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.step, .category-card, .testimonial-card');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s, transform 0.5s';
        });
        
        // 触发滚动事件以显示初始动画
        window.dispatchEvent(new Event('scroll'));
    });
});

// 滚动动画效果
function animateOnScroll() {
    const elements = document.querySelectorAll('.step, .category-card, .testimonial-card');
    
    window.addEventListener('scroll', function() {
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // 如果元素进入视口
            if (position.top < window.innerHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// 简单的表单验证函数
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('请输入有效的姓名');
    }
    
    if (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) {
        errors.push('请输入有效的手机号码');
    }
    
    if (!formData.address || formData.address.trim().length < 5) {
        errors.push('请输入详细的地址信息');
    }
    
    return errors;
}

// 价格计算器
function calculatePrice(weight, pricePerKg) {
    return (weight * pricePerKg).toFixed(2);
}

// 环保贡献计算
function calculateEnvironmentalImpact(weight, materialType) {
    const impacts = {
        'paper': { trees: weight * 0.017, co2: weight * 0.8 },
        'plastic': { trees: weight * 0.002, co2: weight * 2.5 },
        'metal': { trees: weight * 0.005, co2: weight * 4.2 },
        'glass': { trees: weight * 0.001, co2: weight * 0.3 },
        'electronic': { trees: weight * 0.01, co2: weight * 8.7 }
    };
    
    return impacts[materialType] || { trees: 0, co2: 0 };
}

// 本地存储功能
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('保存数据失败:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error('读取数据失败:', e);
        return null;
    }
}

// 模拟API调用
async function mockApiCall(endpoint, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = {
                '/api/booking': { success: true, bookingId: 'B' + Date.now() },
                '/api/prices': { 
                    paper: 0.8, 
                    plastic: 1.2, 
                    metal: 3.5, 
                    glass: 0.3, 
                    electronic: 5.0 
                },
                '/api/login': { success: true, token: 'mock-token-' + Date.now() }
            };
            
            resolve(responses[endpoint] || { success: true });
        }, 500);
    });
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
