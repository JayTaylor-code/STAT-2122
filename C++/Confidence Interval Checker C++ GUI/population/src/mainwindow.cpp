#include "mainwindow.h"
#include <QLineEdit>
#include <QDoubleValidator>
#include <QIntValidator>
#include <QLabel>
#include <QPushButton>
#include <QFormLayout>
#include <QVBoxLayout>
#include <QString>
#include "confidenceInterval.h"

MainWindow::MainWindow(QWidget *parent) : QWidget(parent) {
    setWindowTitle("Confidence Interval Calculator");
    resize(450,300);
    meanBox = new QLineEdit;
    meanBox->setPlaceholderText("e.g. 100.5");
    meanBox->setClearButtonEnabled(true);
    meanBox->setValidator(new QDoubleValidator(-1000000.0,1000000.0,6,meanBox));
    stdDevBox = new QLineEdit;
    stdDevBox->setPlaceholderText("e.g. 15.2");
    stdDevBox->setClearButtonEnabled(true);
    stdDevBox->setValidator(new QDoubleValidator(0.0,1000000.0,6,stdDevBox));
    sizeBox = new QLineEdit;
    sizeBox->setPlaceholderText("e.g. 100");
    sizeBox->setClearButtonEnabled(true);
    sizeBox->setValidator(new QIntValidator(1,100000000,sizeBox));
    confidenceBox = new QLineEdit;
    confidenceBox->setPlaceholderText("e.g. 0.95");
    confidenceBox->setClearButtonEnabled(true);
    confidenceBox->setText("0.95");
    confidenceBox->setValidator(new QDoubleValidator(0.01,0.9999,4,confidenceBox));
    QPushButton* calculateButton = new QPushButton("Calculate");
    zLabel = new QLabel("-");
    seLabel = new QLabel("-");
    lowerLabel = new QLabel("-");
    upperLabel = new QLabel("-");
    auto *formLayout = new QFormLayout;
    formLayout->addRow("Population Mean (x̄):", meanBox);
    formLayout->addRow("Standard Deviation (σ):", stdDevBox);
    formLayout->addRow("Population Size (n):", sizeBox);
    formLayout->addRow("Confidence Level:", confidenceBox);
    auto *resultsLayout = new QFormLayout;
    resultsLayout->addRow("z Critical Value:", zLabel);
    resultsLayout->addRow("Estimated SE:", seLabel);
    resultsLayout->addRow("Lower Bound:", lowerLabel);
    resultsLayout->addRow("Upper Bound:", upperLabel);
    auto *mainLayout = new QVBoxLayout;
    mainLayout->addLayout(formLayout);
    mainLayout->addWidget(calculateButton);
    mainLayout->addLayout(resultsLayout);
    setLayout(mainLayout);
    connect(calculateButton,&QPushButton::clicked,this,&MainWindow::calculateInterval);
}

void MainWindow::calculateInterval() {
    double mean = meanBox->text().toDouble();
    double stdDev = stdDevBox->text().toDouble();
    int size = sizeBox->text().toInt();
    double confidenceLevel = confidenceBox->text().toDouble();
    if (meanBox->text().isEmpty() || stdDevBox->text().isEmpty() || sizeBox->text().isEmpty() || confidenceBox->text().isEmpty()) {
        zLabel->setText("Missing input");
        seLabel->setText("-");
        lowerLabel->setText("-");
        upperLabel->setText("-");
        return;
    }
    else {
        ConfidenceInterval ci = confidenceInterval(mean,stdDev,size,confidenceLevel);
        zLabel->setText(QString::number(ci.zCritical,'f'));
        seLabel->setText(QString::number(ci.standardError, 'f', 6));
        lowerLabel->setText(QString::number(ci.lower, 'f', 6));
        upperLabel->setText(QString::number(ci.upper, 'f', 6));
    }
}