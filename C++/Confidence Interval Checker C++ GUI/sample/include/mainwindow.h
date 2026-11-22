#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QWidget>

class QLineEdit;
class QLabel;
class QPushButton;

class MainWindow : public QWidget {
    public:
        explicit MainWindow(QWidget *parent = nullptr);
    private:
        void calculateInterval();
        QLineEdit* meanBox;
        QLineEdit* stdDevBox;
        QLineEdit* sizeBox;
        QLineEdit* confidenceBox;
        QLabel* tLabel;
        QLabel* seLabel;
        QLabel* lowerLabel;
        QLabel* upperLabel;
};

#endif