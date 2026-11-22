#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QWidget>

class QDoubleSpinBox;
class QSpinBox;
class QLabel;
class QPushButton;

class MainWindow : public QWidget {
    public:
        explicit MainWindow(QWidget *parent = nullptr);
    private:
        void calculateInterval();
        QDoubleSpinBox* meanBox;
        QDoubleSpinBox* stdDevBox;
        QSpinBox* sizeBox;
        QDoubleSpinBox* confidenceBox;
        QLabel* zLabel;
        QLabel* seLabel;
        QLabel* lowerLabel;
        QLabel* upperLabel;
};

#endif