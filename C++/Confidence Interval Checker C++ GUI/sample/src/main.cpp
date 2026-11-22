#include <QApplication>
#include <QIcon>
#include "mainwindow.h"

int main(int argc, char* argv[]) {
    QApplication app(argc, argv);
    app.setWindowIcon(QIcon(":/icons/app_icon.png"));
    MainWindow window;
    window.show();
    return app.exec();
}